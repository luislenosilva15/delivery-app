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

export default function ProductCard({
  item,
  onEdit,
  onDisable,
  onDelete,
}: Props) {
  const itemBgColor = useColorModeValue("white", "gray.700");
  const itemBorderColor = useColorModeValue("gray.200", "gray.600");
  const itemImageBgColor = useColorModeValue("gray.100", "gray.600");
  const itemDescriptionColor = useColorModeValue("gray.500", "gray.400");

  return (
    <Flex
      p={3}
      borderWidth="1px"
      borderRadius="md"
      align="center"
      justify="space-between"
      _hover={{ cursor: "grab" }}
      bg={itemBgColor}
      borderColor={itemBorderColor}
    >
      <HStack>
        <Image
          boxSize="50px"
          borderRadius="md"
          bg={itemImageBgColor}
          alt={item.name}
          src={item?.image || emptyImage}
        />
        <Box>
          {item.disabled && (
            <Tag size="sm" colorScheme="red" mb={1}>
              Desabilitado
            </Tag>
          )}
          <Text fontWeight="bold">{item.name}</Text>
          <Text fontSize="sm" color={itemDescriptionColor}>
            {item.description}
          </Text>
          <Badge colorScheme="green">R$ {item.price}</Badge>
        </Box>
      </HStack>

      <HStack marginRight={4}>
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Mais opções"
            icon={<Text fontSize="xl">⋮</Text>}
            size="sm"
            variant="ghost"
          />
          <MenuList>
            <MenuItem onClick={() => onDisable(item.id)}>
              {item.disabled ? "Habilitar" : "Desabilitar"}
            </MenuItem>
            <MenuItem onClick={() => onEdit(item.id)}>Editar</MenuItem>
            <MenuItem onClick={() => onDelete(item.id)}>Excluir</MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    </Flex>
  );
}
