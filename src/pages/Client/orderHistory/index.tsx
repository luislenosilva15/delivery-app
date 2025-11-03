import {
  Box,
  Text,
  VStack,
  HStack,
  Button,
  Icon,
  Card,
  CardBody,
  IconButton,
  useColorModeValue,
  Badge,
  Flex,
} from "@chakra-ui/react";
import {
  FaArrowLeft,
  FaMotorcycle,
  FaStore,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
} from "react-icons/fa";
import { FiPackage } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { moneyFormat } from "@/helpers/shared";

// Mock data para pedidos anteriores
const mockOrders = [
  {
    id: 1001,
    status: "DELIVERED",
    deliveryMethod: "DELIVERY",
    totalPrice: 45.9,
    createdAt: "2024-10-28T19:30:00",
    items: [
      { name: "Pizza Margherita", quantity: 1, price: 32.9 },
      { name: "Refrigerante 2L", quantity: 1, price: 8.0 },
      { name: "Batata Frita", quantity: 1, price: 5.0 },
    ],
  },
  {
    id: 1002,
    status: "DELIVERED",
    deliveryMethod: "LOCAL",
    totalPrice: 28.5,
    createdAt: "2024-10-25T12:15:00",
    items: [
      { name: "Hambúrguer Clássico", quantity: 2, price: 24.0 },
      { name: "Suco Natural", quantity: 1, price: 4.5 },
    ],
  },
  {
    id: 1003,
    status: "CANCELLED",
    deliveryMethod: "DELIVERY",
    totalPrice: 67.8,
    createdAt: "2024-10-22T20:45:00",
    items: [
      { name: "Prato Executivo", quantity: 2, price: 58.0 },
      { name: "Sobremesa", quantity: 2, price: 9.8 },
    ],
  },
  {
    id: 1004,
    status: "DELIVERED",
    deliveryMethod: "DELIVERY",
    totalPrice: 89.9,
    createdAt: "2024-10-20T18:20:00",
    items: [
      { name: "Combo Família", quantity: 1, price: 75.0 },
      { name: "Refrigerante 2L", quantity: 2, price: 14.9 },
    ],
  },
];

export default function OrderHistoryPage() {
  const navigate = useNavigate();

  const cardBg = useColorModeValue("white", "gray.800");
  const textSecondary = useColorModeValue("gray.600", "gray.400");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  const onBack = () => navigate(-1);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "DELIVERED":
        return "green";
      case "CANCELLED":
        return "red";
      case "IN_PREPARATION":
        return "yellow";
      default:
        return "gray";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "DELIVERED":
        return "Entregue";
      case "CANCELLED":
        return "Cancelado";
      case "IN_PREPARATION":
        return "Em preparo";
      default:
        return "Pendente";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "DELIVERED":
        return FaCheckCircle;
      case "CANCELLED":
        return FaTimesCircle;
      case "IN_PREPARATION":
        return FaClock;
      default:
        return FaClock;
    }
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Box maxW="900px" mx="auto" p={6}>
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
          Histórico de Pedidos
        </Text>
      </Flex>

      {mockOrders.length === 0 ? (
        <Card shadow="md" borderRadius="xl" bg={cardBg}>
          <CardBody textAlign="center" py={16}>
            <Icon as={FiPackage} boxSize={16} color="gray.400" mb={4} />
            <Text fontSize="lg" fontWeight="semibold" color="gray.500" mb={2}>
              Nenhum pedido encontrado
            </Text>
            <Text fontSize="sm" color={textSecondary}>
              Você ainda não fez nenhum pedido neste restaurante.
            </Text>
          </CardBody>
        </Card>
      ) : (
        <VStack spacing={4} align="stretch">
          {mockOrders.map((order) => (
            <Card
              key={order.id}
              shadow="md"
              borderRadius="xl"
              bg={cardBg}
              border="1px"
              borderColor={borderColor}
            >
              <CardBody>
                <Flex justify="space-between" align="start" mb={3}>
                  <HStack spacing={3}>
                    <Icon
                      as={getStatusIcon(order.status)}
                      color={`${getStatusColor(order.status)}.500`}
                      boxSize={5}
                    />
                    <Box>
                      <Text fontWeight="bold" fontSize="lg">
                        Pedido #{order.id}
                      </Text>
                      <Text fontSize="sm" color={textSecondary}>
                        {formatDateTime(order.createdAt)}
                      </Text>
                    </Box>
                  </HStack>
                  <VStack spacing={1} align="end">
                    <Badge
                      colorScheme={getStatusColor(order.status)}
                      variant="subtle"
                      fontSize="xs"
                    >
                      {getStatusLabel(order.status)}
                    </Badge>
                    <HStack spacing={2}>
                      <Icon
                        as={
                          order.deliveryMethod === "LOCAL"
                            ? FaStore
                            : FaMotorcycle
                        }
                        color="gray.500"
                        boxSize={3}
                      />
                      <Text fontSize="xs" color={textSecondary}>
                        {order.deliveryMethod === "LOCAL"
                          ? "Retirada"
                          : "Entrega"}
                      </Text>
                    </HStack>
                  </VStack>
                </Flex>

                <Box mb={4}>
                  <Text fontSize="sm" fontWeight="semibold" mb={2}>
                    Itens do pedido:
                  </Text>
                  <VStack spacing={1} align="stretch">
                    {order.items.map((item, index) => (
                      <HStack key={index} justify="space-between">
                        <Text fontSize="sm" color={textSecondary}>
                          {item.quantity}x {item.name}
                        </Text>
                        <Text fontSize="sm" fontWeight="medium">
                          {moneyFormat(item.price)}
                        </Text>
                      </HStack>
                    ))}
                  </VStack>
                </Box>

                <Flex
                  justify="space-between"
                  align="center"
                  pt={3}
                  borderTop="1px"
                  borderColor={borderColor}
                >
                  <Text fontSize="lg" fontWeight="bold">
                    Total: {moneyFormat(order.totalPrice)}
                  </Text>
                  <HStack spacing={2}>
                    <Button size="sm" variant="outline" colorScheme="blue">
                      Ver Detalhes
                    </Button>
                    {order.status === "DELIVERED" && (
                      <Button size="sm" colorScheme="green" variant="solid">
                        Pedir Novamente
                      </Button>
                    )}
                  </HStack>
                </Flex>
              </CardBody>
            </Card>
          ))}
        </VStack>
      )}
    </Box>
  );
}
