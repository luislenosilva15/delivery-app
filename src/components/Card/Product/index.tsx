import {
  Flex,
  HStack,
  Image,
  Text,
  Badge,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  useColorModeValue,
  Box,
  Tag,
} from "@chakra-ui/react";
import type { Props } from "./types";
import emptyImage from "../../../assets/emptyImage.png";
import { moneyFormat } from "@/helpers/shared";

export default function ProductCard({
  item,
  onEdit,
  onDisable,
  onDelete,
  onClickCard,
  showActions = true,
}: Props) {
  const itemBgColor = useColorModeValue("white", "gray.700");
  const itemBorderColor = useColorModeValue("gray.200", "gray.600");
  const itemImageBgColor = useColorModeValue("gray.100", "gray.600");

  const handleCardClick = () => {
    if (onClickCard) onClickCard(item.id);
  };

  return (
    <Flex
      p={3}
      borderWidth="1px"
      borderRadius="md"
      align="center"
      justify="space-between"
      _hover={{
        cursor: "pointer",
        bg: useColorModeValue("gray.50", "gray.600"),
      }}
      bg={itemBgColor}
      borderColor={itemBorderColor}
      onClick={handleCardClick} // clique no card dispara a função
    >
      <HStack spacing={4}>
        <Image
          boxSize="50px"
          borderRadius="md"
          bg={itemImageBgColor}
          alt={item.name}
          src={item?.image || emptyImage}
        />
        <Box>
          <Text fontWeight="bold">{item.name}</Text>
          <Badge colorScheme="green">{moneyFormat(item.price)}</Badge>

          <HStack spacing={2} mt={2}>
            {item.disabled && <Tag colorScheme="red">Indisponível</Tag>}
          </HStack>
        </Box>
      </HStack>

      {showActions && (onEdit || onDisable || onDelete) && (
        <HStack marginRight={4} onClick={(e) => e.stopPropagation()}>
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Mais opções"
              icon={<Text fontSize="xl">⋮</Text>}
              size="sm"
              variant="ghost"
            />
            <MenuList>
              {onDisable && (
                <MenuItem onClick={() => onDisable(item.id)}>
                  {item.disabled ? "Tornar disponível" : "Tornar indisponível"}
                </MenuItem>
              )}
              {onEdit && (
                <MenuItem onClick={() => onEdit(item.id)}>Editar</MenuItem>
              )}
              {onDelete && (
                <MenuItem onClick={() => onDelete(item.id)}>Excluir</MenuItem>
              )}
            </MenuList>
          </Menu>
        </HStack>
      )}
    </Flex>
  );
}
