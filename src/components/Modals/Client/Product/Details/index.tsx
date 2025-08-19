import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Box,
  Text,
  Image,
  Textarea,
  VStack,
  HStack,
  Button,
  IconButton,
  Center,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import { AddIcon, MinusIcon, ArrowBackIcon } from "@chakra-ui/icons";
import type { Props } from "./types";
import ProductCardEmptyState from "@/components/Card/Client/Product/emptyState";

const ProductModal: React.FC<Props> = ({ isOpen, onClose, product }) => {
  const [quantity, setQuantity] = useState(1);
  const [observations, setObservations] = useState("");

  const bg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const placeholderBg = useColorModeValue("gray.100", "gray.700");
  const placeholderText = useColorModeValue("gray.500", "gray.300");
  const textareaBg = useColorModeValue("gray.50", "gray.700");
  const hoverBg = useColorModeValue("gray.200", "gray.600");
  const boxShadow = useColorModeValue(
    "0 -4px 12px rgba(0,0,0,0.1)",
    "0 -4px 12px rgba(0,0,0,0.6)"
  );

  if (!product) return null;

  const handleAdd = () => {
    console.log("Adicionar ao carrinho:", { product, quantity, observations });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="2xl"
      isCentered
      motionPreset="scale"
      colorScheme="primary"
    >
      <ModalOverlay />
      <ModalContent
        borderRadius="0"
        height="100vh"
        display="flex"
        flexDirection="column"
        bg={bg}
        color={textColor}
      >
        <ModalHeader
          borderBottom="1px solid"
          borderColor={borderColor}
          px={4}
          py={3}
        >
          <Flex align="center" justify="space-between">
            <IconButton
              aria-label="Voltar"
              icon={<ArrowBackIcon />}
              size="md"
              variant="ghost"
              onClick={onClose}
            />
            <Text fontSize="lg" fontWeight="bold" textAlign="center" flex="1">
              Detalhe do produto
            </Text>
            <Box width="40px" />
          </Flex>
        </ModalHeader>

        <ModalBody flex="1" overflowY="auto" px={6} py={4}>
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              borderRadius="lg"
              mb={6}
              width="100%"
              maxH="300px"
              objectFit="cover"
            />
          ) : (
            <ProductCardEmptyState />
          )}

          <Text fontWeight="semibold" fontSize="xl" mb={4} color="green">
            R$ {product.price.toFixed(2).replace(".", ",")}
          </Text>

          <VStack align="stretch" spacing={4}>
            <Box>
              <Text fontWeight="semibold" mb={2}>
                Observações
              </Text>
              <Textarea
                focusBorderColor="primary.500"
                placeholder="Digite suas observações..."
                value={observations}
                onChange={(e) =>
                  observations.length <= 180 && setObservations(e.target.value)
                }
                maxLength={250}
                height={160}
                resize="none"
                bg={textareaBg}
                borderColor={borderColor}
              />
              <Text
                fontSize="xs"
                color={placeholderText}
                textAlign="right"
                mt={2}
              >
                {observations.length}/180
              </Text>
            </Box>
          </VStack>
        </ModalBody>

        <ModalFooter
          justifyContent="space-between"
          position="sticky"
          bottom="0"
          bg={bg}
          px={6}
          py={4}
          boxShadow={boxShadow}
          borderTop="1px solid"
          borderColor={borderColor}
        >
          <HStack
            spacing={0}
            border="1px solid"
            borderColor={borderColor}
            borderRadius="md"
            overflow="hidden"
          >
            <IconButton
              ml={1}
              aria-label="Diminuir quantidade"
              icon={<MinusIcon />}
              size="sm"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              bg={placeholderBg}
              _hover={{ bg: hoverBg }}
            />
            <Box
              display="flex"
              justifyContent="center"
              width={14}
              py={2}
              bg={bg}
            >
              <Text fontWeight="bold">{quantity}</Text>
            </Box>
            <IconButton
              mr={1}
              aria-label="Aumentar quantidade"
              icon={<AddIcon />}
              size="sm"
              onClick={() => setQuantity((q) => q + 1)}
              bg={placeholderBg}
              _hover={{ bg: hoverBg }}
            />
          </HStack>

          <Button
            colorScheme="primary"
            size="md"
            fontSize="md"
            px={4}
            onClick={handleAdd}
          >
            Adicionar R${" "}
            {(product.price * quantity).toFixed(2).replace(".", ",")}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ProductModal;
