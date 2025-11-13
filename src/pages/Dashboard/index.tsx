// React import not required with the project's tsx setup
import {
  Box,
  Heading,
  SimpleGrid,
  Stack,
  Flex,
  Text,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
  Progress,
  Divider,
  VStack,
  Button,
} from "@chakra-ui/react";

import EmptyState from "@/components/EmptyState";
import OrderCard from "@/components/Card/OrderManager/Order";
import ProductCard from "@/components/Card/Product";
import type { TOrder } from "@/store/features/client/types/models";
import type { OrderStatus } from "@/store/features/orderManager/types/request";
import type { TProduct } from "@/store/features/menu/types/models/index";

const mockOrders: TOrder[] = [
  {
    id: 123,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: "IN_PREPARATION" as OrderStatus,
    clientId: 1,
    clientName: "Compra de teste",
    companyId: 1,
    totalPrice: 30.5,
    paymentMethod: "CASH",
    documentInTicket: null,
    paymentCardBrand: null,
    paymentDebitCardBrand: null,
    paymentVoucherBrand: null,
    deliveryMethod: "DELIVERY",
    OrderItem: [
      {
        id: 1,
        orderId: 123,
        productId: 1,
        quantity: 1,
        price: 30.5,
        product: { id: 1, name: "Teste" },
        observation: null,
      },
    ],
    deliveryAddress: null,
    client: {
      id: 1,
      companyId: 1,
      name: "Exemplo",
      email: null,
      phone: "(41) 99947 9736",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    outDeliveryDate: "",
  },
];

const mockProducts: TProduct[] = [];

const DashboardPage: React.FC = () => {
  const cardBg = useColorModeValue("white", "gray.800");
  const border = useColorModeValue("gray.200", "gray.700");

  // NOTE: All data is mocked. Replace with real requests later.
  const methodStats = [
    { label: "Delivery", percent: 72 },
    { label: "Retirada", percent: 28 },
  ];

  return (
    <Box>
      <Heading mb={6}>Início</Heading>

      <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={6} mb={6}>
        {/* Main revenue / hero card */}
        <Box
          gridColumn={{ base: "1 / -1", lg: "1 / span 2" }}
          borderWidth="1px"
          borderColor={border}
          borderRadius="md"
          bg={cardBg}
          p={6}
        >
          <Flex justify="space-between" align="center">
            <Box>
              <Text fontSize="sm" color="gray.500">
                Receita total
              </Text>
              <Text fontSize="2xl" fontWeight="bold">
                R$ 0,00
              </Text>
            </Box>

            <Box textAlign="right">
              <Text fontSize="sm" color="gray.500">
                Pedidos - 7 dias
              </Text>
              <Text fontWeight="semibold">0</Text>
            </Box>
          </Flex>

          <Divider my={4} />

          <Text color="gray.500">
            Sua jornada começa aqui! A soma de suas vendas aparecerá aqui.
          </Text>
        </Box>

        {/* Side quick stats */}
        <Stack spacing={4}>
          <Box
            borderWidth="1px"
            borderColor={border}
            borderRadius="md"
            bg={cardBg}
            p={4}
          >
            <Stat>
              <StatLabel>Receita - 7 dias</StatLabel>
              <StatNumber>R$ 0,00</StatNumber>
            </Stat>
          </Box>

          <Box
            borderWidth="1px"
            borderColor={border}
            borderRadius="md"
            bg={cardBg}
            p={4}
          >
            <Text fontWeight="semibold" mb={2}>
              Formas mais pedidas
            </Text>
            <VStack spacing={3} align="stretch">
              {methodStats.map((m) => (
                <Box key={m.label}>
                  <Flex justify="space-between" align="center" mb={1}>
                    <Text fontSize="sm" fontWeight="medium">
                      {m.label}
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                      {m.percent}%
                    </Text>
                  </Flex>
                  <Progress
                    value={m.percent}
                    size="sm"
                    colorScheme="green"
                    borderRadius="md"
                  />
                </Box>
              ))}
            </VStack>
          </Box>
        </Stack>
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={6}>
        {/* Products most sold area (left) */}
        <Box
          gridColumn={{ base: "1 / -1", lg: "1 / span 2" }}
          borderWidth="1px"
          borderColor={border}
          borderRadius="md"
          bg={cardBg}
          p={4}
        >
          <Flex justify="space-between" align="center" mb={4}>
            <Text fontWeight="bold">Produtos mais vendidos</Text>
            <Button size="sm" variant="ghost">
              Acessar relatório completo
            </Button>
          </Flex>

          {mockProducts.length === 0 ? (
            <EmptyState
              title="Sua jornada começa aqui!"
              description="As estrelas do seu cardápio ganharão luz aqui!"
              size="md"
            />
          ) : (
            <VStack align="stretch" spacing={3}>
              {mockProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  item={p}
                  onEdit={() => {}}
                  onDisable={() => {}}
                  onDelete={() => {}}
                />
              ))}
            </VStack>
          )}
        </Box>

        {/* Orders in progress (right) */}
        <Box
          borderWidth="1px"
          borderColor={border}
          borderRadius="md"
          bg={cardBg}
          p={4}
        >
          <Flex justify="space-between" align="center" mb={4}>
            <Text fontWeight="bold">Pedidos em andamento</Text>
            <Button size="sm" colorScheme="red">
              Acessar painel
            </Button>
          </Flex>

          <Stack>
            {mockOrders.map((o) => (
              <OrderCard
                key={o.id}
                order={o}
                onClick={() => {}}
                onChangeStatus={() => {}}
              />
            ))}

            {mockOrders.length === 0 && (
              <EmptyState
                title="Nenhum pedido no momento"
                description="Pedidos em andamento aparecerão aqui"
                size="sm"
              />
            )}
          </Stack>
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default DashboardPage;
