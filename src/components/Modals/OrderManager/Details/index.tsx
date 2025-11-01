import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Box,
  Text,
  HStack,
  VStack,
  Divider,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  FaPhone,
  FaShoppingBag,
  FaMoneyBillWave,
  FaClock,
} from "react-icons/fa";
import type { OrderModalProps } from "./types";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchOrderRequest } from "@/store/features/orderManager/orderManagerSlice";
import { useOrderManager } from "@/hook/orderManager";
import { formatDate, formatTimeAgo, moneyFormat } from "@/helpers/shared";
import {
  deliveryMethodsTranslations,
  paymentMethodsTraslations,
} from "@/constants";

export const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  onClose,
  orderId,
}) => {
  const dispatch = useDispatch();

  const cardBg = useColorModeValue("gray.50", "gray.700");
  const iconColor = useColorModeValue("gray.500", "gray.300");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const highlightColor = useColorModeValue("green.500", "green.300");

  const { currentOrder } = useOrderManager();

  useEffect(() => {
    if (isOpen && orderId) {
      dispatch(
        fetchOrderRequest({
          orderId,
        })
      );
    }
  }, [dispatch, isOpen, orderId]);

  if (!orderId || !currentOrder) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Pedido #{currentOrder?.id}
          <Text fontSize="sm" color="gray.500">
            {formatTimeAgo(currentOrder.createdAt)}
          </Text>
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <VStack align="stretch" spacing={6}>
            {/* Cliente */}
            <Box p={4} borderWidth="1px" borderRadius="md" bg={cardBg}>
              <Text fontWeight="bold" fontSize="lg" color={textColor}>
                {currentOrder.client.name}
              </Text>
              <SimpleGrid columns={2} spacing={2} mt={2}>
                <HStack>
                  <FaPhone color={iconColor} />
                  <Text color={highlightColor}>
                    {currentOrder.client.phone}
                  </Text>
                </HStack>
                <HStack>
                  <FaShoppingBag color={iconColor} />
                  <Text color={textColor}>
                    {deliveryMethodsTranslations[currentOrder.deliveryMethod]}
                  </Text>
                </HStack>
                <HStack>
                  <FaMoneyBillWave color={iconColor} />
                  <Text color={textColor}>
                    {paymentMethodsTraslations[currentOrder.paymentMethod]}
                  </Text>
                </HStack>
                <HStack>
                  <FaClock color={iconColor} />
                  <Text color={textColor}>
                    {formatDate(currentOrder.createdAt)}
                  </Text>
                </HStack>
              </SimpleGrid>
            </Box>

            <Box p={3} borderWidth="1px" borderRadius="md" bg={cardBg} gap={4}>
              <Text fontWeight="bold" mb={2} color={textColor}>
                Itens do pedido
              </Text>
              {currentOrder.OrderItem.map((item) => (
                <Box key={item.id} mb={4}>
                  <HStack fontWeight="bold" color={textColor} mb={1}>
                    <Text flex="1">Qtd</Text>
                    <Text flex="3">Item</Text>
                    <Text flex="1">Cód.</Text>
                    <Text flex="1" textAlign="right">
                      Preço
                    </Text>
                  </HStack>
                  <Divider mb={2} />
                  <HStack color={textColor}>
                    <Text flex="1">{item.quantity}</Text>
                    <Text flex="3">{item.product.name}</Text>
                    <Text flex="1">-</Text>
                    <Text flex="1" textAlign="right">
                      {moneyFormat(item.price)}
                    </Text>
                  </HStack>
                </Box>
              ))}
            </Box>

            <Box
              p={3}
              borderWidth="1px"
              borderRadius="md"
              bg={cardBg}
              textAlign="right"
              fontWeight="bold"
              color={textColor}
            >
              Total: {moneyFormat(currentOrder.totalPrice)}
            </Box>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
