import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  IconButton,
  Image,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import type { CartProps } from "./types";

import emptyImage from "../../../../assets/emptyImage.png";
import { moneyFormat } from "@/helpers/shared";

const CartCard = ({ item, onUpdateQuantity }: CartProps) => {
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const secondaryTextColor = useColorModeValue("gray.500", "gray.400");

  return (
    <Box
      key={item.id}
      borderWidth="1px"
      rounded="md"
      p={3}
      mb={3}
      bg={bgColor}
      borderColor={borderColor}
      _hover={{ shadow: "sm" }}
    >
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
            <Text fontWeight="bold" color={textColor}>
              {item.name}
            </Text>
            <Text color={secondaryTextColor} fontWeight="medium">
              {moneyFormat(item.price)}
            </Text>
            {item.observation && (
              <Text fontSize="sm" color={secondaryTextColor}>
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
          <Text fontWeight="medium" color={textColor}>
            {item.quantity}
          </Text>
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
