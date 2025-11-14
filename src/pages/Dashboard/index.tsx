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
} from "@chakra-ui/react";

import Loading from "@/components/Loading";
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
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchDashboardRequest } from "@/store/features/dashboard/dashboardSlice";
import useDashboard from "@/hook/dashboard";
// Keeping charts mocked for now; real series can be wired later

const DashboardPage: React.FC = () => {
  const cardBg = useColorModeValue("white", "gray.800");
  const border = useColorModeValue("gray.200", "gray.700");
  const chartBg = useColorModeValue("gray.50", "gray.800");
  const gridStroke = useColorModeValue("#f0f0f0", "#2d2d2d");
  const lineStroke = useColorModeValue("#2b6cb0", "#63b3ed");

  const dispatch = useDispatch();
  const { data, loading } = useDashboard();

  useEffect(() => {
    dispatch(fetchDashboardRequest());
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }

  // Use delivery method percentages from dashboard data when available
  const methodStats = [
    {
      label: "Delivery",
      percent: data?.deliveryMethodPercentages?.DELIVERY ?? 0,
    },
    { label: "Retirada", percent: data?.deliveryMethodPercentages?.LOCAL ?? 0 },
  ];

  const totalSalesAmount = data?.totalRevenueMonth ?? 0;
  const totalSalesCount = data?.totalOrdersMonth ?? 0;
  const avgTicket = data?.averageTicketMonth ?? 0;
  const uniqueClientsCount = data?.totalNewClientsMonth ?? 0;

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
              bg={chartBg}
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
                    <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
                    <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke={lineStroke}
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
              <StatNumber>
                {moneyFormat(data?.totalRevenue7Days ?? 0)}
              </StatNumber>
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
              <StatNumber>
                {moneyFormat(data?.averageTicket7Days ?? 0)}
              </StatNumber>
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
              <StatNumber>
                {moneyFormat(data?.totalRevenue7Days ?? 0)}
              </StatNumber>
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

      {/* <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={6}>
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
      </SimpleGrid> */}
    </Box>
  );
};

export default DashboardPage;
