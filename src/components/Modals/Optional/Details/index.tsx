import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  VStack,
  HStack,
  Text,
  Badge,
  Box,
  Divider,
  Tag,
  SimpleGrid,
} from "@chakra-ui/react";
import type { Props } from "./types";
import { mockOptionals } from "@/mocks/optionals";
import { formatToBRL } from "@/utils/validations";

// Mock de produtos relacionados
const mockRelatedProducts = [
  { id: 1, name: "Pizza Margherita", category: "Pizzas" },
  { id: 2, name: "Pizza Calabresa", category: "Pizzas" },
  { id: 3, name: "Hambúrguer Clássico", category: "Lanches" },
];

export default function OptionalDetailsModal({
  isOpen,
  onClose,
  optionalId,
}: Props) {
  const optional = mockOptionals.find((o) => o.id === optionalId);

  if (!optional) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <HStack>
            <Text>{optional.name}</Text>
            <Badge colorScheme={optional.type === "simple" ? "blue" : "green"}>
              {optional.type === "simple" ? "Simples" : "Opções"}
            </Badge>
            {optional.disabled && <Badge colorScheme="red">Desabilitado</Badge>}
          </HStack>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={6} align="stretch">
            {/* Informações Básicas */}
            <Box>
              <Text fontWeight="semibold" mb={2}>
                Informações Gerais
              </Text>
              <HStack spacing={4}>
                <Text fontSize="sm" color="gray.600">
                  Código: {optional.code || "N/A"}
                </Text>
                <Text fontSize="sm" color="gray.600">
                  Criado em:{" "}
                  {new Date(optional.createdAt).toLocaleDateString("pt-BR")}
                </Text>
              </HStack>
            </Box>

            <Divider />

            {/* Detalhes Específicos */}
            {optional.type === "simple" ? (
              <Box>
                <Text fontWeight="semibold" mb={3}>
                  Opcional Simples
                </Text>
                <HStack spacing={4}>
                  <Text>
                    Preço adicional:{" "}
                    <strong>{formatToBRL(optional.price || 0)}</strong>
                  </Text>
                </HStack>
              </Box>
            ) : (
              <Box>
                <Text fontWeight="semibold" mb={3}>
                  Opcional de Opções
                </Text>
                <VStack align="start" spacing={3}>
                  <HStack spacing={4}>
                    <Text>
                      Mínimo: <strong>{optional.min}</strong>
                    </Text>
                    <Text>
                      Máximo: <strong>{optional.max}</strong>
                    </Text>
                    <Text>
                      Pode repetir:{" "}
                      <strong>{optional.canRepeat ? "Sim" : "Não"}</strong>
                    </Text>
                  </HStack>

                  <Box>
                    <Text fontWeight="semibold" mb={2}>
                      Opções Disponíveis:
                    </Text>
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={2}>
                      {optional.options?.map((opt, index) => (
                        <HStack
                          key={index}
                          p={2}
                          border="1px solid"
                          borderColor="gray.200"
                          borderRadius="md"
                        >
                          <VStack align="start" spacing={0} flex={1}>
                            <Text fontWeight="semibold">{opt.name}</Text>
                            <Text fontSize="sm" color="gray.600">
                              +{formatToBRL(opt.price)}{" "}
                              {opt.code && `(${opt.code})`}
                            </Text>
                          </VStack>
                        </HStack>
                      ))}
                    </SimpleGrid>
                  </Box>
                </VStack>
              </Box>
            )}

            <Divider />

            {/* Produtos Relacionados */}
            <Box>
              <Text fontWeight="semibold" mb={3}>
                Produtos que usam este opcional
              </Text>
              {mockRelatedProducts.length > 0 ? (
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={2}>
                  {mockRelatedProducts.map((product) => (
                    <HStack
                      key={product.id}
                      p={3}
                      border="1px solid"
                      borderColor="gray.200"
                      borderRadius="md"
                    >
                      <VStack align="start" spacing={0} flex={1}>
                        <Text fontWeight="semibold">{product.name}</Text>
                        <Tag size="sm" colorScheme="purple">
                          {product.category}
                        </Tag>
                      </VStack>
                    </HStack>
                  ))}
                </SimpleGrid>
              ) : (
                <Text fontSize="sm" color="gray.600">
                  Nenhum produto associado a este opcional ainda.
                </Text>
              )}
            </Box>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
