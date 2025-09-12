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
import { useMemo } from "react";
import { moneyFormat } from "@/helpers/shared";

export default function ProductCard({
  item,
  onEdit,
  onDisable,
  onDelete,
  onClickCard,
}: Props) {
  const itemBgColor = useColorModeValue("white", "gray.700");
  const itemBorderColor = useColorModeValue("gray.200", "gray.600");
  const itemImageBgColor = useColorModeValue("gray.100", "gray.600");

  const renderDisponibilityTag = useMemo(() => {
    const availability = {
      DELIVERY: <Tag colorScheme="yellow">Delivery</Tag>,
      LOCAL: <Tag colorScheme="gray">Local</Tag>,
      BOTH: <Tag colorScheme="blue">Delivery e Local</Tag>,
    };
    return [availability[item.productAvailabilityBy]];
  }, [item.productAvailabilityBy]);

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
            {renderDisponibilityTag}
            {item.disabled && <Tag colorScheme="red">Indisponível</Tag>}
          </HStack>
        </Box>
      </HStack>

      <HStack marginRight={4} onClick={(e) => e.stopPropagation()}>
        {/* Evita disparar onClick do card ao clicar no menu */}
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
              {item.disabled ? "Tornar disponível" : "Tornar indisponível"}
            </MenuItem>
            <MenuItem onClick={() => onEdit(item.id)}>Editar</MenuItem>
            <MenuItem onClick={() => onDelete(item.id)}>Excluir</MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    </Flex>
  );
}
