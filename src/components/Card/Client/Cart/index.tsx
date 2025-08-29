import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { Box, Flex, IconButton, Image, Text } from "@chakra-ui/react";
import type { CartProps } from "./types";

import emptyImage from "../../../../assets/emptyImage.png";

const CartCard = ({ item, onUpdateQuantity }: CartProps) => {
  return (
    <Box key={item.id} borderWidth="1px" rounded="md" p={3} mb={3}>
      <Flex justify="space-between" align="center">
        <Box flexDirection="row" display="flex" gap={4} alignItems="center">
          <Image
            boxSize="50px"
            borderRadius="md"
            bg={item?.imageUrl}
            alt={item.name}
            src={item?.imageUrl || emptyImage}
          />
          <Box>
            <Text fontWeight="bold">{item.name}</Text>
            <Text color="gray.300">R$ {item.price.toFixed(2)}</Text>
            {item.observation && (
              <Text fontSize="sm" color="gray.300">
                {item.observation}
              </Text>
            )}
          </Box>
        </Box>

        <Flex align="center" gap={2}>
          <IconButton
            aria-label="Diminuir"
            size="sm"
            colorScheme={item.quantity === 1 ? "red" : "gray"}
            icon={<MinusIcon />}
            onClick={() =>
              onUpdateQuantity(item.uniqueId as string, item.quantity - 1)
            }
          />
          <Text>{item.quantity}</Text>
          <IconButton
            aria-label="Aumentar"
            size="sm"
            icon={<AddIcon />}
            onClick={() =>
              onUpdateQuantity(item.uniqueId as string, item.quantity + 1)
            }
          />
        </Flex>
      </Flex>
    </Box>
  );
};

export default CartCard;
