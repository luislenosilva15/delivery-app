import ProductCard from "@/components/Card/Client/Product";
import { useClient } from "@/hook/client";
import {
  fetchCompanyRequest,
  fetchGroupsRequest,
} from "@/store/features/client/clientSlice";
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
  Spinner,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useState, useRef, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import type { TGroup, TProduct } from "@/store/features/menu/types/models";
import ProductModal from "@/components/Modals/Client/Product/Details";

const ClientMenuPage = () => {
  const dispatch = useDispatch();
  const { id: clientId } = useParams<{ id: string }>();
  const { company, loading, groups } = useClient();

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

  useEffect(() => {
    if (company) return;

    if (clientId) {
      dispatch(fetchCompanyRequest({ id: Number(clientId) }));
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

  const handleGroupClick = (groupId: number) => {
    const section = groupsRef.current[groupId];
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setActiveGroup(groupId);
    }
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

  if (!groups || !company || loading) {
    return (
      <VStack spacing={8} py={10} align="center" justifyContent="center">
        <Spinner size="xl" />
      </VStack>
    );
  }

  return (
    <>
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
      />
    </>
  );
};

export default ClientMenuPage;
