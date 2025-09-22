import { formatTimeAgo, moneyFormat } from "@/helpers/shared";
import {
  Badge,
  Box,
  Divider,
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiMoreVertical } from "react-icons/fi";
import type { Props } from "./types";
import {
  deliveryMethodsTranslations,
  orderStatusOptions,
  paymentMethodsTraslations,
} from "@/constants";

function OrderCard({ order }: Props) {
  const cardBg = useColorModeValue("white", "gray.800");
  const border = useColorModeValue("gray.200", "gray.700");
  const shadow = useColorModeValue("md", "dark-lg");

  return (
    <Box
      borderWidth="1.5px"
      borderRadius="xl"
      bg={cardBg}
      borderColor={border}
      p={5}
      minW="270px"
      maxW="280px"
      boxShadow={shadow}
      mr={5}
      transition="all 0.2s"
      _hover={{ boxShadow: "xl" }}
      position="relative"
    >
      <Flex justify="space-between" align="center" mb={2}>
        <HStack spacing={2}>
          <Text fontWeight="bold" fontSize="md">
            #{order.id}
          </Text>
        </HStack>
        <Menu isLazy>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<FiMoreVertical />}
            size="sm"
            variant="ghost"
            colorScheme="primary"
            zIndex={1}
          />
          <MenuList zIndex={2} boxShadow="2xl">
            {orderStatusOptions.map((opt) => (
              <MenuItem key={opt.label}>{opt.label}</MenuItem>
            ))}
          </MenuList>
        </Menu>
      </Flex>
      <Divider mb={2} />
      <Flex align="center" mb={1}>
        <Text fontSize="sm" fontWeight="semibold">
          {order.client.name}
        </Text>
      </Flex>
      <Text fontSize="sm" color="gray.400" mb={1}>
        {deliveryMethodsTranslations[order.deliveryMethod]}
      </Text>
      <Text fontSize="sm" color="gray.400" mb={1}>
        {paymentMethodsTraslations[order.paymentMethod]} (a pagar)
      </Text>
      <Flex align="center" justify="space-between" mt={2}>
        <Text fontWeight="bold" fontSize="md" color="green.500">
          {moneyFormat(order.totalPrice)}
        </Text>
      </Flex>
      <Text fontSize="xs" color="gray.400" mt={2}>
        {formatTimeAgo(order.createdAt)}
      </Text>
    </Box>
  );
}

export default OrderCard;
