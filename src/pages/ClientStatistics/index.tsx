import {
  Box,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  HStack,
  Stack,
  Select,
  useColorModeValue,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useEffect, useState, useCallback, useRef } from "react";
import { useStatistics } from "@/hook/statistics";
import { useDispatch } from "react-redux";
import {
  fetchClientsRequest,
  resetStatistics,
} from "@/store/features/statistics/statisticsSlice";
import Breadcrumb from "@/components/Breadcrumb";
import { ClientModalDetails } from "@/components/Modals/Statistics/Client/Details";
import type { TClient } from "@/store/features/statistics/types/models";

function daysAgo(dateStr?: string | null) {
  if (!dateStr) return "-";
  const d = new Date(dateStr);
  const diff = Math.floor((Date.now() - d.getTime()) / (1000 * 60 * 60 * 24));
  if (diff === 0) return "Hoje";
  if (diff === 1) return "1 dia";
  return `${diff} dias`;
}

export default function ClientStatisticsPage() {
  const dispatch = useDispatch();

  const stats = useStatistics();
  const { clients, loading, loadingMore, page, hasMore, total } = stats.client;

  const [searchText, setSearchText] = useState("");
  const [lastOrderDays] = useState<number | undefined>(undefined);
  const [sortBy, setSortBy] = useState<
    "" | "orders" | "firstOrder" | "lastOrder"
  >("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<TClient | null>(null);

  const isFirstDebounce = useRef(true);

  const textTotal = useColorModeValue("gray.600", "gray.200");

  const fetchClients = useCallback(
    (
      pageNum: number,
      query: string,
      lastDays?: number,
      sort?: "orders" | "firstOrder" | "lastOrder"
    ) => {
      dispatch(
        fetchClientsRequest({
          page: pageNum,
          search: query,
          lastOrderDays: lastDays,
          sortBy: sort,
        })
      );
    },
    [dispatch]
  );

  useEffect(() => {
    // initial load
    fetchClients(1, "", undefined);
    return () => {
      dispatch(resetStatistics());
    };
  }, [fetchClients, dispatch]);

  useEffect(() => {
    // skip the debounce fetch on the first mount because we already
    // perform an initial load in the mount effect. This prevents
    // a double request (initial + debounce) when the page loads.
    if (isFirstDebounce.current) {
      isFirstDebounce.current = false;
      return;
    }

    const handler = setTimeout(() => {
      fetchClients(1, searchText, lastOrderDays, sortBy || undefined);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchText, lastOrderDays, sortBy, fetchClients]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 200 &&
        !loading &&
        !loadingMore &&
        hasMore
      ) {
        fetchClients(page + 1, searchText, lastOrderDays, sortBy || undefined);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [
    loading,
    loadingMore,
    hasMore,
    page,
    searchText,
    lastOrderDays,
    sortBy,
    fetchClients,
  ]);

  const hoverBg = useColorModeValue("gray.50", "gray.700");

  const breadcrumbLinks = [
    { label: "Home", href: "/" },
    { label: "Clientes", isCurrent: true },
  ];

  return (
    <Box mx="auto" p={6}>
      <Breadcrumb links={breadcrumbLinks} />
      <Stack>
        <Flex justify="space-between" align="center">
          <Heading size="md">Clientes</Heading>
        </Flex>

        <Flex justify="space-between" align="center" mb={4}>
          <HStack spacing={3} mt={2}>
            <InputGroup maxW="300px">
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.400" />
              </InputLeftElement>
              <Input
                placeholder="Buscar por nome ou telefone"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                focusBorderColor="primary.500"
              />
            </InputGroup>

            <Select
              value={sortBy}
              onChange={(e) =>
                setSortBy(
                  e.target.value as "" | "orders" | "firstOrder" | "lastOrder"
                )
              }
              maxW="220px"
            >
              <option value="">Ordenar por padrão</option>
              <option value="orders">Quantidade de pedidos</option>
            </Select>
          </HStack>

          <Text fontSize="sm" color={textTotal}>
            Total: {total} clientes
          </Text>
        </Flex>

        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Nome</Th>
              <Th>Telefone</Th>
              <Th>Cliente há</Th>
              <Th>Último pedido</Th>
              <Th>Quant. pedidos</Th>
            </Tr>
          </Thead>
          <Tbody>
            {clients?.map((c: TClient) => (
              <Tr
                key={c.id}
                cursor="pointer"
                _hover={{ bg: hoverBg }}
                onClick={() => {
                  setSelectedClient(c);
                  setIsModalOpen(true);
                }}
              >
                <Td>
                  <HStack spacing={3}>
                    <Box>
                      <Text fontWeight="medium">{c.name}</Text>
                    </Box>
                  </HStack>
                </Td>
                <Td>{c.phone || "-"}</Td>
                <Td>{daysAgo(c.firstOrderDate)}</Td>
                <Td>{c.lastOrderDate ? daysAgo(c.lastOrderDate) : "-"}</Td>
                <Td>{c.ordersCount ?? 0}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        {(loading || loadingMore) && (
          <Flex justify="center" mt={4}>
            <Spinner color="primary.500" />
          </Flex>
        )}
      </Stack>

      <ClientModalDetails
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        client={selectedClient}
      />
    </Box>
  );
}
