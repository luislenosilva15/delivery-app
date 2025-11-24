import {
  Flex,
  HStack,
  Text,
  Badge,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import type { Props } from "./types";

export default function OptionalCard({
  optional,
  onEdit,
  onDisable,
  onDelete,
}: Props) {
  const itemBgColor = useColorModeValue("white", "gray.700");
  const itemBorderColor = useColorModeValue("gray.200", "gray.600");

  const handleDisable = () => {
    onDisable?.(optional.id);
  };

  return (
    <Flex
      p={4}
      borderWidth="1px"
      borderRadius="md"
      align="center"
      justify="space-between"
      bg={itemBgColor}
      borderColor={itemBorderColor}
      opacity={optional.disabled ? 0.6 : 1}
    >
      <VStack align="start" spacing={2} flex={1}>
        <HStack>
          <Text fontWeight="semibold">{optional.name}</Text>
          {optional.disabled && (
            <Badge colorScheme="red" size="sm">
              Desabilitado
            </Badge>
          )}
          <Badge
            colorScheme={optional.type === "simple" ? "blue" : "green"}
            size="sm"
          >
            {optional.type === "simple" ? "Simples" : "Opções"}
          </Badge>
        </HStack>

        {optional.code && (
          <Text fontSize="sm" color="gray.600">
            Código: {optional.code}
          </Text>
        )}

        {optional.type === "simple" && optional.price && (
          <Text fontSize="sm" color="gray.600">
            Preço: R$ {optional.price.toFixed(2).replace(".", ",")}
          </Text>
        )}

        {optional.type === "options" && (
          <>
            {optional.min !== undefined && optional.max !== undefined && (
              <Text fontSize="sm" color="gray.600">
                Seleção: {optional.min}-{optional.max} opções
              </Text>
            )}
            {optional.canRepeat !== undefined && (
              <Text fontSize="sm" color="gray.600">
                Pode repetir: {optional.canRepeat ? "Sim" : "Não"}
              </Text>
            )}
            {optional.options && optional.options.length > 0 && (
              <VStack align="start" spacing={1}>
                <Text fontSize="sm" fontWeight="medium" color="gray.700">
                  Opções ({optional.options.length}):
                </Text>
                {optional.options.slice(0, 3).map((option, index) => (
                  <HStack key={index} spacing={2}>
                    <Text fontSize="xs" color="gray.600">
                      • {option.name}
                    </Text>
                    <Text fontSize="xs" color="green.600" fontWeight="medium">
                      R$ {option.price.toFixed(2).replace(".", ",")}
                    </Text>
                    {option.code && (
                      <Text fontSize="xs" color="gray.500">
                        ({option.code})
                      </Text>
                    )}
                  </HStack>
                ))}
                {optional.options.length > 3 && (
                  <Text fontSize="xs" color="gray.500">
                    ...e mais {optional.options.length - 3} opções
                  </Text>
                )}
              </VStack>
            )}
          </>
        )}

        <Text fontSize="xs" color="gray.500">
          Criado em {new Date(optional.createdAt).toLocaleDateString("pt-BR")}
        </Text>
      </VStack>

      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Opções"
          icon={<BsThreeDotsVertical />}
          variant="ghost"
          size="sm"
          onClick={(e) => e.stopPropagation()}
        />
        <MenuList>
          {onEdit && (
            <MenuItem
              onClick={(e) => {
                e.stopPropagation();
                onEdit(optional.id);
              }}
            >
              Editar
            </MenuItem>
          )}
          {onDisable && (
            <MenuItem
              onClick={(e) => {
                e.stopPropagation();
                handleDisable();
              }}
            >
              {optional.disabled ? "Habilitar" : "Desabilitar"}
            </MenuItem>
          )}
          {onDelete && (
            <MenuItem
              onClick={(e) => {
                e.stopPropagation();
                onDelete(optional.id);
              }}
              color="red.500"
            >
              Excluir
            </MenuItem>
          )}
        </MenuList>
      </Menu>
    </Flex>
  );
}
