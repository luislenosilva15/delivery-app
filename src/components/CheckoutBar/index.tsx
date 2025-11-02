import { moneyFormat } from "@/helpers/shared";
import { useClient } from "@/hook/client";
import { Box, HStack, Text } from "@chakra-ui/react";
import { FaShoppingCart } from "react-icons/fa";

const CheckoutBar = ({ onClick }: { onClick: () => void }) => {
  const { cart, company } = useClient();

  const cartTotal =
    cart?.items?.reduce((sum, item) => sum + item.price * item.quantity, 0) ||
    0;

  const isRestaurantClosed = !company?.isOpen;

  return (
    <Box
      position="fixed"
      bottom="0"
      left="0"
      right="0"
      bg="transparent"
      zIndex={20}
      px={4}
    >
      <Box
        onClick={isRestaurantClosed ? undefined : onClick}
        maxW="900px"
        mx="auto"
        bg={isRestaurantClosed ? "gray.600" : "primary.500"}
        color="white"
        py={3}
        px={6}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        boxShadow="0 -2px 10px rgba(0,0,0,0.1)"
        borderTopRadius="md"
        cursor={isRestaurantClosed ? "not-allowed" : "pointer"}
        transition="transform 0.2s ease-in-out"
        _hover={
          isRestaurantClosed
            ? {}
            : {
                transform: "scale(1.02)",
              }
        }
      >
        <HStack spacing={3}>
          <Box position="relative">
            <FaShoppingCart size={24} />
            {cart?.items?.length > 0 && (
              <Box
                position="absolute"
                top="-5px"
                right="-5px"
                bg={isRestaurantClosed ? "gray.400" : "primary.400"}
                color={isRestaurantClosed ? "white" : "black"}
                borderRadius="full"
                fontSize="xs"
                px={2}
                py={0.5}
              >
                {cart?.items?.length}
              </Box>
            )}
          </Box>
          <Text fontWeight="bold">
            {isRestaurantClosed ? "Restaurante fechado" : "Meu pedido"}
          </Text>
        </HStack>
        <Text fontWeight="bold">{moneyFormat(cartTotal)}</Text>
      </Box>
    </Box>
  );
};

export default CheckoutBar;
