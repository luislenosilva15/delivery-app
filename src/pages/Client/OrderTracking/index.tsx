import {
  Box,
  Flex,
  Text,
  VStack,
  HStack,
  Button,
  Divider,
  Icon,
  Card,
  CardBody,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaClock, FaWhatsapp, FaArrowLeft } from "react-icons/fa";
import { motion } from "framer-motion";

const MotionHStack = motion(HStack);

export default function OrderTracking({ onBack }: { onBack?: () => void }) {
  const cardBg = useColorModeValue("white", "gray.800");
  const textSecondary = useColorModeValue("gray.600", "gray.400");
  const dividerColor = useColorModeValue("gray.200", "gray.700");

  return (
    <Box maxW="600px" mx="auto" p={6}>
      {/* Header com botão voltar */}
      <Flex align="center" mb={6}>
        <IconButton
          aria-label="Voltar"
          icon={<FaArrowLeft />}
          variant="ghost"
          fontSize="20px"
          mr={3}
          onClick={onBack}
        />
        <Text fontSize="xl" fontWeight="bold">
          Acompanhamento de pedidos
        </Text>
      </Flex>

      {/* Pedido enviado - animação de entrada */}
      <Card mb={4} shadow="md" borderRadius="xl" bg={cardBg}>
        <CardBody textAlign="center">
          <MotionHStack
            justify="center"
            spacing={3}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Icon as={FaClock} boxSize={5} />
            <Text fontWeight="semibold">Pedido enviado!</Text>
          </MotionHStack>
          <Text fontSize="sm" color={textSecondary}>
            Aguardando a confirmação da loja
          </Text>
        </CardBody>
      </Card>

      {/* Timeline */}
      <VStack align="start" spacing={6} mb={6} pl={2}>
        {/* Pedido pendente - animação pulse */}
        <MotionHStack
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        >
          <Icon as={FaClock} color="orange.400" />
          <Text fontWeight="semibold">Pedido pendente...</Text>
        </MotionHStack>

        {/* Preparo */}
        <HStack opacity={0.5}>
          <Box
            w="10px"
            h="10px"
            borderRadius="full"
            bg={dividerColor}
            mr={2}
          ></Box>
          <Text>Preparo</Text>
        </HStack>

        {/* Retirada */}
        <HStack opacity={0.5}>
          <Box
            w="10px"
            h="10px"
            borderRadius="full"
            bg={dividerColor}
            mr={2}
          ></Box>
          <Text>Retirada</Text>
        </HStack>
      </VStack>

      <Divider mb={6} borderColor={dividerColor} />

      {/* Info da loja */}
      <Card shadow="md" borderRadius="xl" bg={cardBg}>
        <CardBody>
          <HStack justify="space-between">
            <HStack>
              <Box>
                <Text fontWeight="semibold">Pizzaria do Luis</Text>
                <Text fontSize="sm" color={textSecondary}>
                  Total: R$ 88,88
                </Text>
              </Box>
            </HStack>
            <Text fontSize="xs" color={textSecondary}>
              #0001
            </Text>
          </HStack>

          <Flex mt={4} gap={3}>
            <Button
              leftIcon={<FaWhatsapp />}
              colorScheme="primary"
              variant="outline"
              flex="1"
            >
              Iniciar conversa
            </Button>
            <Button colorScheme="primary" flex="1">
              Ver pedido
            </Button>
          </Flex>
        </CardBody>
      </Card>
    </Box>
  );
}
