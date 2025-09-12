import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Flex,
  Text,
  Box,
  Divider,
  useColorModeValue,
} from "@chakra-ui/react";
import type { OrderDetailsProps } from "./types";
import { moneyFormat } from "@/helpers/shared";
import { format } from "date-fns";
import { paymentMethodsTraslations } from "@/constants";

export const OrderDetails: React.FC<OrderDetailsProps> = ({
  isOpen,
  onClose,
  order,
}) => {
  // Cores adaptáveis
  const textPrimary = useColorModeValue("gray.800", "gray.100");
  const textSecondary = useColorModeValue("gray.600", "gray.400");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  if (!order) return <></>;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color={textPrimary}>Detalhes do Pedido</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          {/* Cabeçalho */}
          <Flex justify="space-between" align="center" mb={4}>
            <Text fontWeight="bold" color={textPrimary}>
              Pedido #{order.id}
            </Text>
            <Text fontSize="sm" color={textSecondary}>
              {format(new Date(order.createdAt), "dd/MM/yyyy HH:mm")}
            </Text>
          </Flex>

          <Box
            borderWidth="1px"
            borderColor={borderColor}
            rounded="md"
            p={3}
            mb={4}
          >
            <Text fontWeight="bold" color={textPrimary}>
              {order.client.name}
            </Text>
            <Text color={textSecondary}>{order.client.phone}</Text>
          </Box>

          {/* Itens */}
          {order?.OrderItem?.map((item) => (
            <Flex
              key={item.id}
              justify="space-between"
              align="center"
              mb={2}
              p={2}
              borderWidth="1px"
              borderColor={borderColor}
              rounded="md"
            >
              <Box>
                <Text color={textPrimary}>{item.product.name}</Text>

                <Text fontSize="sm" color={textSecondary}>
                  {moneyFormat(item.price)}
                </Text>
                {item.observation && (
                  <Text mt={2} color={textSecondary}>
                    {item.observation}
                  </Text>
                )}
              </Box>
              <Text color={textPrimary}>x{item.quantity}</Text>
            </Flex>
          ))}

          <Divider my={4} borderColor={borderColor} />

          {/* Total */}
          <Flex justify="space-between" mb={4}>
            <Text fontWeight="bold" color={textPrimary}>
              Total
            </Text>
            <Text fontWeight="bold" color={textPrimary}>
              {moneyFormat(order.totalPrice)}
            </Text>
          </Flex>

          {/* Pagamento */}
          <Box borderWidth="1px" borderColor={borderColor} rounded="md" p={3}>
            <Text fontSize="sm" color={textSecondary} mb={1}>
              Forma de pagamento
            </Text>
            <Text fontWeight="bold" color={textPrimary}>
              {paymentMethodsTraslations[order.paymentMethod]}
            </Text>

            {order.paymentCardBrand && (
              <Text fontSize="sm" color={textSecondary}>
                Bandeira:{" "}
                <Text as="span" color={textPrimary} fontWeight="medium">
                  {order.paymentCardBrand}
                </Text>
              </Text>
            )}

            {order.paymentDebitCardBrand && (
              <Text fontSize="sm" color={textSecondary}>
                Bandeira:{" "}
                <Text as="span" color={textPrimary} fontWeight="medium">
                  {order.paymentDebitCardBrand}
                </Text>
              </Text>
            )}

            {order.paymentVoucherBrand && (
              <Text fontSize="sm" color={textSecondary}>
                Bandeira:{" "}
                <Text as="span" color={textPrimary} fontWeight="medium">
                  {order.paymentVoucherBrand}
                </Text>
              </Text>
            )}
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="red"
            variant="outline"
            w="full"
            onClick={onClose}
          >
            Fechar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
