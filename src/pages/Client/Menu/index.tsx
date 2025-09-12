import ProductCard from "@/components/Card/Client/Product";
import { useClient } from "@/hook/client";
import {
  fetchCartRequest,
  fetchCompanyRequest,
  fetchGroupsRequest,
  setAddToCartRequest,
  setChangeQuantityRequest,
  setCreateNewOrderRequest,
} from "@/store/features/client/clientSlice";
import { LuCookingPot } from "react-icons/lu";

import { cuisineLabel } from "@/utils/typeNormalize";
import {
  Box,
  VStack,
  HStack,
  Text,
  Badge,
  Image,
  Divider,
  Button,
  SimpleGrid,
  useColorModeValue,
  useDisclosure,
  IconButton,
} from "@chakra-ui/react";
import { useState, useRef, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import type { TGroup, TProduct } from "@/store/features/menu/types/models";
import ProductModal from "@/components/Modals/Client/Product/Details";
import CheckoutBar from "@/components/CheckoutBar";
import { CartModal } from "@/components/Modals/Client/Product/Cart";
import type { FormData } from "@/components/Modals/Client/Product/Cart/types";
import type { SetCreateNewOrderRequest } from "@/store/features/client/types/request";
import Loading from "@/components/Loading";

const ClientMenuPage = () => {
  const dispatch = useDispatch();
  const { id: clientId } = useParams<{ id: string }>();
  const { company, loading, groups, loadingCart, cart } = useClient();

  const {
    isOpen: isProductModalOpen,
    onOpen: onProductModalOpen,
    onClose: onProductModalClose,
  } = useDisclosure();

  const [activeGroup, setActiveGroup] = useState<number | null>(null);
  const [currentProduct, setCurrentProduct] = useState<TProduct | null>(null);

  const groupsRef = useRef<Record<number, HTMLDivElement | null>>({});
  const navRef = useRef<HTMLDivElement | null>(null);
  const buttonRefs = useRef<Record<number, HTMLButtonElement | null>>({});
  const observerRef = useRef<IntersectionObserver | null>(null);

  const {
    isOpen: isOpenCart,
    onOpen: onOpenCart,
    onClose: onCloseCart,
  } = useDisclosure();

  const cartEmpty: boolean =
    cart.items.map((item) => item.quantity).reduce((a, b) => a + b, 0) === 0;

  useEffect(() => {
    if (company) return;

    if (clientId) {
      dispatch(fetchCompanyRequest({ id: Number(clientId) }));
      dispatch(fetchCartRequest());
    }
  }, [clientId, company, dispatch]);

  useEffect(() => {
    if (company?.menuId) {
      dispatch(fetchGroupsRequest({ menuId: company.menuId }));
    }
  }, [company, dispatch]);

  useEffect(() => {
    if (!groups || groups.length === 0) return;

    observerRef.current?.disconnect();

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting);
        if (visibleEntry) {
          const groupId = Number(visibleEntry.target.dataset.group);
          setActiveGroup(groupId);

          const button = buttonRefs.current[groupId];
          if (button && navRef.current) {
            const scrollTarget =
              button.offsetLeft -
              navRef.current.offsetLeft -
              navRef.current.offsetWidth / 2 +
              button.offsetWidth / 2;
            navRef.current.scrollTo({ left: scrollTarget, behavior: "smooth" });
          }
        }
      },
      { root: null, rootMargin: "-50% 0px -50% 0px", threshold: 0 }
    );

    groups.forEach((group) => {
      const el = groupsRef.current[group.id];
      if (el) observer.observe(el);
    });

    observerRef.current = observer;

    return () => observer.disconnect();
  }, [groups]);

  useEffect(() => {
    if (cartEmpty) {
      onCloseCart();
    }
  }, [cartEmpty, onCloseCart]);

  const handleAddProductCart = (
    product: TProduct,
    quantity: number,
    observation?: string
  ) => {
    dispatch(
      setAddToCartRequest({
        item: {
          id: product.id,
          quantity,
          imageUrl: product.image as string,
          name: product.name as string,
          price: product.price as number,
          observation,
        },
      })
    );
  };

  const handleGroupClick = (groupId: number) => {
    const section = groupsRef.current[groupId];
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setActiveGroup(groupId);
    }
  };

  const handleUpdateCartItemQuantity = (uniqueId: string, quantity: number) => {
    dispatch(
      setChangeQuantityRequest({
        uniqueId,
        quantity,
      })
    );
  };

  const handleCreateNewOrder = (formData: FormData) => {
    if (!company) return;

    if (!formData.option || !formData.payment) return;

    const paymentMethod = formData.payment;

    dispatch(
      setCreateNewOrderRequest({
        items: cart.items,
        name: formData.name,
        phone: formData.phone,
        deliveryMethod: formData.option,
        payment: {
          method: paymentMethod,
          cardBrand:
            paymentMethod === "CREDIT_CARD" ? formData.subPayment : null,
          debitCardBrand:
            paymentMethod === "DEBIT_CARD" ? formData.subPayment : null,
          voucherBrand:
            paymentMethod === "VOUCHER" ? formData.subPayment : null,
          totalPrice: cart.items
            .map((item) => item.price * item.quantity)
            .reduce((a, b) => a + b, 0),
        },
        companyId: company?.id,
      } as SetCreateNewOrderRequest)
    );
  };

  const renderedGroups = useMemo(
    () =>
      groups?.map((group: TGroup) => (
        <Box
          key={group.id}
          data-group={group.id}
          ref={(el) => (groupsRef.current[group.id] = el)}
          mb={10}
          scrollMarginTop="100px"
        >
          <Text fontSize="xl" fontWeight="semibold" mb={4}>
            {group.name}
          </Text>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
            {group.products.map((product) => (
              <ProductCard
                product={product}
                key={product.id}
                onClick={() => {
                  setCurrentProduct(product);
                  onProductModalOpen();
                }}
              />
            ))}
          </SimpleGrid>
        </Box>
      )),
    [groups, onProductModalOpen]
  );

  const categoryBg = useColorModeValue("white", "gray.800");

  if (!groups || !company || loading || loadingCart) {
    return <Loading />;
  }

  return (
    <Box>
      <Box maxW="900px" mx="auto" py={6} px={4}>
        <VStack spacing={3} textAlign="center">
          <Image
            src={company.logoUrl}
            alt="Logo da Empresa"
            boxSize="80px"
            borderRadius="full"
          />
          <Text fontSize="2xl" fontWeight="bold">
            {company.name}
          </Text>
          <HStack spacing={2}>
            <Badge colorScheme="gray">
              {cuisineLabel[company.cuisineType]}
            </Badge>
            <Badge colorScheme={company.isOpen ? "green" : "red"}>
              {company.isOpen ? "Aberto" : "Fechado"}
            </Badge>
          </HStack>
          <Text fontSize="sm" color="gray.500" mt={2}>
            Selecione um endereço para entrega
          </Text>
        </VStack>

        <Divider my={6} />

        <Box
          ref={navRef}
          overflowX="auto"
          overflowY="hidden"
          whiteSpace="nowrap"
          position="sticky"
          top="0"
          bg={categoryBg}
          zIndex={10}
          py={2}
          px={2}
          sx={{
            scrollbarWidth: "none",
            "::-webkit-scrollbar": { display: "none" },
          }}
        >
          <HStack spacing={3}>
            {groups.map((group) => (
              <Button
                key={group.id}
                ref={(el) => (buttonRefs.current[group.id] = el)}
                display="inline-block"
                whiteSpace="nowrap"
                variant={activeGroup === group.id ? "solid" : "outline"}
                colorScheme={activeGroup === group.id ? "primary" : "gray"}
                size="sm"
                borderRadius="full"
                onClick={() => handleGroupClick(group.id)}
                minWidth="max-content"
              >
                {group.name}
              </Button>
            ))}
          </HStack>
        </Box>

        <Box mt={6}>{renderedGroups}</Box>
      </Box>

      <ProductModal
        isOpen={isProductModalOpen}
        onClose={onProductModalClose}
        product={currentProduct}
        addProduct={handleAddProductCart}
      />

      <CartModal
        isOpen={isOpenCart && !cartEmpty}
        onClose={onCloseCart}
        items={cart.items}
        onSubmit={handleCreateNewOrder}
        onUpdateQuantity={handleUpdateCartItemQuantity}
      />
      {!cartEmpty && <CheckoutBar onClick={onOpenCart} />}

      <Box position="fixed" bottom="20px" right="20px" zIndex={20}>
        <IconButton
          aria-label="Ver pedidos"
          icon={<LuCookingPot />}
          colorScheme="primary"
          size="lg"
          rounded="full"
          shadow="lg"
          onClick={onOpenCart}
        />
        {!cartEmpty && (
          <Badge
            colorScheme="red"
            borderRadius="full"
            px={2}
            position="absolute"
            top="-5px"
            right="-5px"
            fontSize="0.8em"
          >
            {cart.items.reduce((acc, item) => acc + item.quantity, 0)}
          </Badge>
        )}
      </Box>
    </Box>
  );
};

export default ClientMenuPage;
