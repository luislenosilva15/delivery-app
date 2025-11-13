import { formatTimeAgo, moneyFormat } from "@/helpers/shared";
import {
  Box,
  Divider,
  Flex,
  HStack,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
  VStack,
  Badge,
} from "@chakra-ui/react";
import {
  FiMoreVertical,
  FiUser,
  FiTruck,
  FiCreditCard,
  FiClock,
  FiDollarSign,
} from "react-icons/fi";
import type { Props } from "./types";
import {
  deliveryMethodsTranslations,
  orderStatusCardColor,
  paymentMethodsTraslations,
} from "@/constants";
import { orderActions } from "@/helpers/orderActions";
import { MdPix } from "react-icons/md";
import type { OrderStatus } from "@/store/features/orderManager/types/request";

function OrderCard({ order, onClick, onChangeStatus }: Props) {
  const cardBg = useColorModeValue("white", "gray.800");
  const border = useColorModeValue("gray.200", "gray.700");
  const shadow = useColorModeValue("md", "dark-lg");

  const deliveryMethod = deliveryMethodsTranslations[order.deliveryMethod];
  const paymentMethod = paymentMethodsTraslations[order.paymentMethod];

  const paymentMethodIcon = {
    CREDIT_CARD: FiCreditCard,
    DEBIT_CARD: FiCreditCard,
    VOUCHER: FiCreditCard,
    CASH: FiDollarSign,
    PIX: MdPix,
  };

  const deliveryMethodIcon = {
    DELIVERY: FiTruck,
    LOCAL: FiUser,
  };

  return (
    <>
      <Box
        borderWidth="1.5px"
        borderRadius="2xl"
        bg={cardBg}
        borderColor={border}
        p={5}
        minW="280px"
        maxW="350px"
        boxShadow={shadow}
        mr={5}
        _hover={{
          boxShadow: "xl",
          cursor: "pointer",
        }}
        position="relative"
        onClick={onClick}
      >
        <Flex justify="space-between" align="center" mb={3}>
          <HStack spacing={2}>
            <Badge
              colorScheme={orderStatusCardColor[order.status]}
              fontSize="0.8em"
              px={2}
              py={1}
              borderRadius="lg"
            >
              Pedido #{order.id}
            </Badge>
          </HStack>
          <Menu isLazy>
            {order.status !== "DELIVERED" && (
              <>
                <MenuButton
                  as={IconButton}
                  aria-label="Options"
                  icon={<FiMoreVertical />}
                  size="sm"
                  variant="ghost"
                  colorScheme="primary"
                  zIndex={1}
                  onClick={(e) => e.stopPropagation()}
                />
                <MenuList zIndex={2} boxShadow="2xl">
                  {orderActions(order.status).map((opt) => (
                    <MenuItem
                      key={opt.label}
                      onClick={(e) => {
                        e.stopPropagation();
                        onChangeStatus(opt.action as OrderStatus, order.id);
                      }}
                    >
                      {opt.label}
                    </MenuItem>
                  ))}
                </MenuList>
              </>
            )}
          </Menu>
        </Flex>

        <Divider mb={3} />

        <VStack align="start" spacing={2}>
          <HStack>
            <Icon as={FiUser} color="gray.500" />
            <Text fontSize="sm" fontWeight="semibold">
              {order.clientName || "-"}
            </Text>
          </HStack>

          <HStack>
            <Icon
              as={deliveryMethodIcon[order.deliveryMethod]}
              color="blue.500"
            />
            <Text fontSize="sm" color="gray.500">
              {deliveryMethod}
            </Text>
          </HStack>

          <HStack>
            <Icon
              as={paymentMethodIcon[order.paymentMethod]}
              color="orange.400"
            />
            <Text fontSize="sm" color="gray.500">
              {paymentMethod} (a pagar)
            </Text>
          </HStack>
        </VStack>

        <Flex align="center" justify="space-between" mt={4}>
          <HStack>
            <Text fontWeight="medium" fontSize="medium" color="green.500">
              {moneyFormat(order.totalPrice)}
            </Text>
          </HStack>
          <HStack>
            <Icon as={FiClock} color="gray.400" />
            <Text fontSize="xs" color="gray.400">
              {formatTimeAgo(order.createdAt)}
            </Text>
          </HStack>
        </Flex>
      </Box>
    </>
  );
}

export default OrderCard;
