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
} from "@chakra-ui/react";
import { useEffect, useState, useCallback, useRef } from "react";
import { moneyFormat } from "@/helpers/shared";
import { DownloadIcon } from "@chakra-ui/icons";
import { toast } from "@/utils/toast";
import { useDispatch } from "react-redux";
import { useSales } from "@/hook/sales";
import {
  fetchSalesRequest,
  resetSales,
} from "@/store/features/sales/salesSlice";
import {
  clientOrderStatusTranslationsList,
  deliveryMethodsTranslations,
  paymentMethodsTraslations,
} from "@/constants";
import Loading from "@/components/Loading";
import Breadcrumb from "@/components/Breadcrumb";
import EmptyState from "@/components/EmptyState";
import { MdInbox } from "react-icons/md";

const breadcrumbLinks = [
  { label: "Home", href: "/" },
  { label: "Vendas", isCurrent: true },
];

function startOfMonth(d = new Date()) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

const SalesPage = () => {
  const dispatch = useDispatch();
  const salesState = useSales();
  const {
    sales: list,
    loading,
    loadingMore,
    page,
    hasMore,
    total,
    totalSeller,
    averageTicket,
  } = salesState.sales;

  const [from, setFrom] = useState<string>(
    startOfMonth().toISOString().slice(0, 10)
  );
  const [to, setTo] = useState<string>(new Date().toISOString().slice(0, 10));
  const [includeRejected, setIncludeRejected] = useState(false);

  const firstDebounce = useRef(true);
  const requestingRef = useRef(false);
  const lastRequestedPageRef = useRef<number>(0);

  const fetchSales = useCallback(
    (pageNum: number, f: string, t: string, includeR: boolean) => {
      if (requestingRef.current) return;
      if (lastRequestedPageRef.current >= pageNum) return;
      requestingRef.current = true;
      lastRequestedPageRef.current = pageNum;
      dispatch(
        fetchSalesRequest({
          page: pageNum,
          from: f,
          to: t,
          includeRejected: includeR,
        })
      );
    },
    [dispatch]
  );

  useEffect(() => {
    requestingRef.current = false;
    lastRequestedPageRef.current = 0;
    fetchSales(1, from, to, includeRejected);
    return () => {
      dispatch(resetSales());
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (firstDebounce.current) {
      firstDebounce.current = false;
      return;
    }
    const h = setTimeout(() => {
      requestingRef.current = false;
      lastRequestedPageRef.current = 0;
      fetchSales(1, from, to, includeRejected);
    }, 400);
    return () => clearTimeout(h);
  }, [from, to, includeRejected, fetchSales]);

  useEffect(() => {
    const onScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 200 &&
        !loading &&
        !loadingMore &&
        hasMore &&
        !requestingRef.current
      ) {
        fetchSales(page + 1, from, to, includeRejected);
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [
    loading,
    loadingMore,
    hasMore,
    page,
    from,
    to,
    includeRejected,
    fetchSales,
  ]);

  useEffect(() => {
    if (!loading && !loadingMore) {
      requestingRef.current = false;
    }
  }, [loading, loadingMore]);

  const hoverBg = useColorModeValue("gray.50", "gray.700");
  const cardBg = useColorModeValue("white", "gray.800");
  const cardBorder = useColorModeValue("gray.100", "gray.700");

  const handleExport = () => {
    toast({ title: "Exportação em breve", status: "info" });
  };

  return (
    <Box mx="auto" p={6}>
      <Breadcrumb links={breadcrumbLinks} />
      <Flex justify="space-between" align="center" mb={4} wrap="wrap" gap={2}>
        <Heading size="md">Vendas</Heading>
        <Button
          leftIcon={<DownloadIcon />}
          onClick={handleExport}
          variant="outline"
        >
          Exportar
        </Button>
      </Flex>

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

      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={4} mb={6}>
        <Box
          bg={cardBg}
          borderWidth="1px"
          borderColor={cardBorder}
          borderRadius="lg"
          p={4}
        >
          <Stat>
            <StatLabel>Venda total (período)</StatLabel>
            <StatNumber>{moneyFormat(totalSeller || 0)}</StatNumber>
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
            <StatLabel>Nº Total de pedidos</StatLabel>
            <StatNumber>{total}</StatNumber>
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
            <StatLabel>Ticket médio</StatLabel>
            <StatNumber>{moneyFormat(Number(averageTicket) || 0)}</StatNumber>
          </Stat>
        </Box>
      </SimpleGrid>

      {!loading && list.length === 0 ? (
        <EmptyState
          size="md"
          icon={<MdInbox />}
          title="Nenhuma venda encontrada"
          description="Ajuste os filtros ou aguarde novos pedidos para ver os resultados aqui."
        />
      ) : (
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th># Id</Th>
              <Th>Nome</Th>
              <Th>Tipo</Th>
              <Th>Pagamento</Th>
              <Th>Status</Th>
              <Th>Criado em</Th>
              <Th isNumeric>Total do pedido</Th>
            </Tr>
          </Thead>
          <Tbody>
            {list.map((s) => {
              const name = s.clientName || "-";
              const deliveryType =
                deliveryMethodsTranslations[s.deliveryMethod];
              const payment = paymentMethodsTraslations[s.paymentMethod];
              const total = s.totalPrice;
              const status = clientOrderStatusTranslationsList[s.status];
              return (
                <Tr key={s.id} _hover={{ bg: hoverBg }} cursor="pointer">
                  <Td>{s.id}</Td>
                  <Td>{name}</Td>
                  <Td>{deliveryType}</Td>
                  <Td>{payment}</Td>
                  <Td>{status}</Td>
                  <Td>{new Date(s.createdAt).toLocaleDateString()}</Td>
                  <Td isNumeric>{moneyFormat(total)}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      )}

      {(loading || loadingMore) && (
        <Flex justify="center" mt={4}>
          <Loading />
        </Flex>
      )}
    </Box>
  );
};

export default SalesPage;
