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
  HStack,
  Button,
} from "@chakra-ui/react";

import EmptyState from "@/components/EmptyState";
import OrderCard from "@/components/Card/OrderManager/Order";
import ProductCard from "@/components/Card/Product";
import { moneyFormat } from "@/helpers/shared";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format, subDays } from "date-fns";
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

const mockProducts: TProduct[] = [
  {
    id: 1,
    alwaysAvailable: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    code: "P001",
    name: "Combo Burguer",
    description: "Delicioso combo com batata e refrigerante",
    price: 29.9,
    menuGroupId: 1,
    isAdultOnly: false,
    image: null,
    disabled: false,
    imageUrl: null,
  },
  {
    id: 2,
    alwaysAvailable: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    code: "P002",
    name: "Pizza Margherita",
    description: "Pizza clássica com molho de tomate e manjericão",
    price: 39.5,
    menuGroupId: 1,
    isAdultOnly: false,
    image: null,
    disabled: false,
    imageUrl: null,
  },
  {
    id: 3,
    alwaysAvailable: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    code: "P003",
    name: "Salada Caesar",
    description: "Salada fresca com molho caesar",
    price: 18.0,
    menuGroupId: 1,
    isAdultOnly: false,
    image: null,
    disabled: false,
    imageUrl: null,
  },
];

// Mock sales counts for products (used to determine top sellers)
const mockProductSales = [
  { productId: 2, sold: 48 },
  { productId: 1, sold: 35 },
  { productId: 3, sold: 12 },
];

const topProducts = mockProductSales
  .slice()
  .sort((a, b) => b.sold - a.sold)
  .slice(0, 3)
  .map((s) => ({
    product: mockProducts.find((p) => p.id === s.productId) as TProduct,
    sold: s.sold,
  }));

const DashboardPage: React.FC = () => {
  const cardBg = useColorModeValue("white", "gray.800");
  const border = useColorModeValue("gray.200", "gray.700");

  // NOTE: All data is mocked. Replace with real requests later.
  const methodStats = [
    { label: "Delivery", percent: 72 },
    { label: "Retirada", percent: 28 },
  ];

  // derive some simple stats from the mocked orders (replace with real data later)
  const ordersLast7 = mockOrders; // replace with filter by date when real data available
  const totalSalesAmount = ordersLast7.reduce(
    (s, o) => s + (o.totalPrice || 0),
    0
  );
  const totalSalesCount = ordersLast7.length;
  const avgTicket = totalSalesCount ? totalSalesAmount / totalSalesCount : 0;
  const uniqueClientsCount = new Set(
    ordersLast7.map((o) => o.clientId || o.client?.id)
  ).size;

  // generate mock 30-day sales data (replace with real series later)
  const sales30 = Array.from({ length: 30 }).map((_, idx) => {
    const day = subDays(new Date(), 29 - idx);
    const seed = (idx * 7) % 50;
    const value = Math.round(20 + seed + (idx % 5) * 6);
    return { date: format(day, "dd/MM"), value };
  });

  return (
    <Box>
      <Heading mb={6}>Início</Heading>

      <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={6} mb={6}>
        {/* Main revenue / hero card (expanded to fill whitespace) */}
        <Box
          gridColumn={{ base: "1 / -1", lg: "1 / span 2" }}
          borderWidth="1px"
          borderColor={border}
          borderRadius="md"
          bg={cardBg}
          p={6}
        >
          <Flex justify="space-between" align="center">
            <Box flex="1">
              <Text fontSize="sm" color="gray.500">
                Receita mensal
              </Text>
              <Text fontSize="2xl" fontWeight="bold">
                {moneyFormat(totalSalesAmount)}
              </Text>
            </Box>

            {/* CTA removed as requested */}
          </Flex>

          <Divider my={4} />

          {/* chart + larger KPIs to occupy space */}
          <Flex gap={6} align="stretch">
            <Box
              flex={1}
              borderWidth="1px"
              borderColor={border}
              borderRadius="md"
              p={4}
              bg={useColorModeValue("gray.50", "gray.800")}
            >
              <Text fontSize="sm" fontWeight="semibold" mb={2}>
                Vendas deste mês
              </Text>
              <Box h="140px" borderRadius="md">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={sales30}
                    margin={{ top: 8, right: 12, left: -8, bottom: 4 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke={useColorModeValue("#f0f0f0", "#2d2d2d")}
                    />
                    <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke={useColorModeValue("#2b6cb0", "#63b3ed")}
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </Box>

            <VStack
              spacing={3}
              align="stretch"
              w={{ base: "180px", md: "260px" }}
            >
              <Box
                borderWidth="1px"
                borderColor={border}
                borderRadius="md"
                p={3}
                bg={cardBg}
              >
                <Text fontSize="xs" color="gray.500">
                  Total pedidos este mês
                </Text>
                <Text fontWeight="bold" fontSize="lg">
                  {totalSalesCount}
                </Text>
              </Box>

              <Box
                borderWidth="1px"
                borderColor={border}
                borderRadius="md"
                p={3}
                bg={cardBg}
              >
                <Text fontSize="xs" color="gray.500">
                  Novos clientes este mês
                </Text>
                <Text fontWeight="bold" fontSize="lg">
                  {uniqueClientsCount}
                </Text>
              </Box>

              <Box
                borderWidth="1px"
                borderColor={border}
                borderRadius="md"
                p={3}
                bg={cardBg}
              >
                <Text fontSize="xs" color="gray.500">
                  Ticket médio deste mês
                </Text>
                <Text fontWeight="bold" fontSize="lg">
                  {moneyFormat(avgTicket)}
                </Text>
              </Box>
            </VStack>
          </Flex>
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
              <StatNumber>{moneyFormat(totalSalesAmount)}</StatNumber>
            </Stat>
          </Box>

          <Box
            borderWidth="1px"
            borderColor={border}
            borderRadius="md"
            bg={cardBg}
            p={4}
          >
            <Stat>
              <StatLabel>Ticket médio vendas dos 7 dias</StatLabel>
              <StatNumber>{moneyFormat(avgTicket)}</StatNumber>
            </Stat>
          </Box>

          <Box
            borderWidth="1px"
            borderColor={border}
            borderRadius="md"
            bg={cardBg}
            p={4}
          >
            <Stat>
              <StatLabel>Total vendas últimos 7 dias</StatLabel>
              <StatNumber>{moneyFormat(totalSalesAmount)}</StatNumber>
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
              {topProducts.map(({ product, sold }) => (
                <Box key={product.id}>
                  <ProductCard item={product} showActions={false} />
                  <Text fontSize="sm" color="gray.500" mt={1}>
                    Vendidos: {sold}
                  </Text>
                </Box>
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
            {mockOrders.slice(0, 3).map((o) => (
              <OrderCard key={o.id} order={o} showActions={false} />
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
