import {
  Box,
  Flex,
  Heading,
  HStack,
  Input,
  Checkbox,
  Button,
  Text,
  useColorModeValue,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
} from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { moneyFormat } from "@/helpers/shared";
import { DownloadIcon } from "@chakra-ui/icons";
import { toast } from "@/utils/toast";

type TOrder = {
  id: number;
  code: string;
  customerName: string;
  type: "Entrega" | "Retirada";
  identifier?: string | null;
  payment: "Dinheiro" | "Pix" | "Cartão";
  status: "Concluído" | "Entrega" | "Cancelado" | "Recusado" | "Pendente";
  itemsCount: number;
  createdAt: string; // ISO
  scheduledAt?: string | null; // ISO
  total: number; // sem entrega
  totalWithDelivery: number; // com entrega
  discount?: number; // valor de desconto
  fees?: number; // taxas recebidas
};

// util simples para gerar uma data ISO entre dois dias
function randomDateISO(start: Date, end: Date) {
  const ts =
    start.getTime() + Math.random() * (end.getTime() - start.getTime());
  return new Date(ts).toISOString();
}

function startOfMonth(d = new Date()) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

// Gera uma base mockada determinística por sessão
function generateMockOrders(total = 120, from: Date, to: Date): TOrder[] {
  const types: Array<TOrder["type"]> = ["Entrega", "Retirada"];
  const pays: Array<TOrder["payment"]> = ["Dinheiro", "Pix", "Cartão"];
  const statuses: Array<TOrder["status"]> = [
    "Concluído",
    "Entrega",
    "Pendente",
    "Cancelado",
    "Recusado",
  ];

  const arr: TOrder[] = [];
  for (let i = 0; i < total; i++) {
    const createdAt = randomDateISO(from, to);
    const items = Math.floor(Math.random() * 5) + 1;
    const base = Math.round((Math.random() * 60 + 10) * 100) / 100; // 10 a 70
    const delivery = Math.random() > 0.5 ? 7.9 : 0;
    const discount =
      Math.random() > 0.8 ? Math.round(Math.random() * 10 * 100) / 100 : 0;
    const fees =
      Math.random() > 0.6 ? Math.round(Math.random() * 5 * 100) / 100 : 0;
    const totalWithDelivery = Math.max(0, base + delivery - discount);
    const total = Math.max(0, base - discount);
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    arr.push({
      id: i + 1,
      code: `#${String(i + 1).padStart(4, "0")}`,
      customerName: i % 2 === 0 ? "luis silva" : "maria cliente",
      type: types[Math.floor(Math.random() * types.length)],
      identifier: Math.random() > 0.4 ? "Entrega" : null,
      payment: pays[Math.floor(Math.random() * pays.length)],
      status,
      itemsCount: items,
      createdAt,
      scheduledAt:
        Math.random() > 0.7 ? randomDateISO(new Date(createdAt), to) : null,
      total,
      totalWithDelivery,
      discount,
      fees,
    });
  }
  // ordena por data desc
  return arr.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

const PAGE_SIZE = 20;

const SalesPage = () => {
  // Filtro por período
  const [from, setFrom] = useState<string>(
    startOfMonth().toISOString().slice(0, 10)
  );
  const [to, setTo] = useState<string>(new Date().toISOString().slice(0, 10));
  const [includeRejected, setIncludeRejected] = useState(false);

  // Mock base é (re)gerada quando período muda para ficar coerente
  const mockBase = useMemo(() => {
    return generateMockOrders(160, new Date(from), new Date(to));
  }, [from, to]);

  // Lista paginada (infinite)
  const [visible, setVisible] = useState<TOrder[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  // const isFirst = useRef(true);

  const filtered = useMemo(() => {
    return mockBase.filter((o) =>
      includeRejected ? true : o.status !== "Recusado"
    );
  }, [mockBase, includeRejected]);

  // Métricas do período
  const metrics = useMemo(() => {
    const total = filtered.reduce((acc, o) => acc + o.total, 0);
    const totalWithFees = filtered.reduce(
      (acc, o) => acc + o.total + (o.fees || 0),
      0
    );
    const totalWithDiscounts = filtered.reduce(
      (acc, o) => acc + Math.max(0, o.total - (o.discount || 0)),
      0
    );
    const count = filtered.length;
    const avg = count ? total / count : 0;
    return { total, totalWithFees, totalWithDiscounts, count, avg };
  }, [filtered]);

  // Carregamento inicial e quando filtros mudam
  useEffect(() => {
    setLoading(true);
    setPage(1);
    const slice = filtered.slice(0, PAGE_SIZE);
    setVisible(slice);
    setHasMore(filtered.length > slice.length);
    setLoading(false);
  }, [filtered]);

  // Infinite scroll
  useEffect(() => {
    const onScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 200 &&
        !loading &&
        !loadingMore &&
        hasMore
      ) {
        setLoadingMore(true);
        const next = page + 1;
        const slice = filtered.slice(0, next * PAGE_SIZE);
        setVisible(slice);
        setPage(next);
        setHasMore(filtered.length > slice.length);
        setLoadingMore(false);
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [filtered, page, hasMore, loading, loadingMore]);

  const hoverBg = useColorModeValue("gray.50", "gray.700");
  const cardBg = useColorModeValue("white", "gray.800");
  const cardBorder = useColorModeValue("gray.100", "gray.700");

  const handleExport = () => {
    toast({ title: "Exportação em breve (mock)", status: "info" });
  };

  return (
    <Box mx="auto" p={6}>
      <Flex justify="space-between" align="center" mb={4} wrap="wrap" gap={4}>
        <Heading size="md">Vendas</Heading>
        <Button
          leftIcon={<DownloadIcon />}
          onClick={handleExport}
          variant="outline"
        >
          Exportar
        </Button>
      </Flex>

      {/* Filtros */}
      <HStack spacing={3} mb={6} align="center" wrap="wrap">
        <HStack>
          <Input
            type="date"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            max={to}
          />
          <Text>→</Text>
          <Input
            type="date"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            min={from}
          />
        </HStack>
        <Checkbox
          isChecked={includeRejected}
          onChange={(e) => setIncludeRejected(e.target.checked)}
        >
          Exibir pedidos recusados
        </Checkbox>
      </HStack>

      {/* Cards de métricas */}
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 5 }} spacing={4} mb={6}>
        <Box
          bg={cardBg}
          borderWidth="1px"
          borderColor={cardBorder}
          borderRadius="lg"
          p={4}
        >
          <Stat>
            <StatLabel>Venda total (período)</StatLabel>
            <StatNumber>{moneyFormat(metrics.total)}</StatNumber>
          </Stat>
        </Box>

        <Box
          bg={cardBg}
          borderWidth="1px"
          borderColor={cardBorder}
          borderRadius="lg"
          p={4}
        >
          <Stat>
            <StatLabel>Venda total com taxas (período)</StatLabel>
            <StatNumber>{moneyFormat(metrics.totalWithFees)}</StatNumber>
          </Stat>
        </Box>

        <Box
          bg={cardBg}
          borderWidth="1px"
          borderColor={cardBorder}
          borderRadius="lg"
          p={4}
        >
          <Stat>
            <StatLabel>Venda total com descontos (período)</StatLabel>
            <StatNumber>{moneyFormat(metrics.totalWithDiscounts)}</StatNumber>
          </Stat>
        </Box>

        <Box
          bg={cardBg}
          borderWidth="1px"
          borderColor={cardBorder}
          borderRadius="lg"
          p={4}
        >
          <Stat>
            <StatLabel>Nº Total de pedidos (período)</StatLabel>
            <StatNumber>{metrics.count}</StatNumber>
          </Stat>
        </Box>

        <Box
          bg={cardBg}
          borderWidth="1px"
          borderColor={cardBorder}
          borderRadius="lg"
          p={4}
        >
          <Stat>
            <StatLabel>Ticket médio (período)</StatLabel>
            <StatNumber>{moneyFormat(metrics.avg)}</StatNumber>
          </Stat>
        </Box>
      </SimpleGrid>

      {/* Tabela */}
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th># Código</Th>
            <Th>Nome</Th>
            <Th>Tipo</Th>
            <Th>Identificador</Th>
            <Th>Pagamento</Th>
            <Th>Status</Th>
            <Th>Criado em</Th>
            <Th isNumeric>Total do pedido</Th>
          </Tr>
        </Thead>
        <Tbody>
          {visible.map((o) => (
            <Tr key={o.id} _hover={{ bg: hoverBg }} cursor="pointer">
              <Td>{o.code}</Td>
              <Td>{o.customerName}</Td>
              <Td>{o.type}</Td>
              <Td>{o.identifier || "-"}</Td>
              <Td>{o.payment}</Td>
              <Td>{o.status}</Td>
              <Td>{new Date(o.createdAt).toLocaleDateString()}</Td>
              <Td isNumeric>{moneyFormat(o.total)}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {(loading || loadingMore) && (
        <Flex justify="center" mt={4}>
          <Spinner />
        </Flex>
      )}
    </Box>
  );
};

export default SalesPage;
