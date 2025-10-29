import Breadcrumb from "@/components/Breadcrumb";
import { MdInbox } from "react-icons/md";
import OrderCard from "@/components/Card/OrderManager/Order";
import Loading from "@/components/Loading";
import { useOrderManager } from "@/hook/orderManager";
import {
  fetchOrdersCountRequest,
  fetchOrdersRequest,
  setChangeOrderStatusRequest,
} from "@/store/features/orderManager/orderManagerSlice";
import {
  Box,
  Flex,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Badge,
  Text,
  HStack,
  Heading,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { statusTabs } from "@/constants";
import { OrderModal } from "@/components/Modals/OrderManager/Details";
import type { OrderStatus } from "@/store/features/orderManager/types/request";

export default function OrderManagerPage() {
  const dispatch = useDispatch();
  const { loading, orders, ordersCount } = useOrderManager();
  const [tabIndex, setTabIndex] = useState(0);
  const [currentOrderId, setCurrentOrderId] = useState<number | undefined>(
    undefined
  );

  const {
    isOpen: isOpenDetails,
    onOpen: onOpenDetails,
    onClose: onCloseDetails,
  } = useDisclosure();

  useEffect(() => {
    dispatch(fetchOrdersRequest({ status: statusTabs[tabIndex].status }));
  }, [dispatch, tabIndex]);

  useEffect(() => {
    dispatch(fetchOrdersCountRequest());
  }, [dispatch]);

  const handleChangeOrderStatus = (status: OrderStatus, orderId: number) => {
    dispatch(setChangeOrderStatusRequest({ orderId, status }));
  };

  const breadcrumbLinks = [
    { label: "Home", href: "/" },
    { label: "Pedidos", isCurrent: true },
  ];

  return (
    <>
      <Box p={6}>
        <Breadcrumb links={breadcrumbLinks} />
        <Stack>
          <Flex justify="space-between" align="center">
            <Heading size="md">Pedidos</Heading>
          </Flex>
          <Tabs
            colorScheme="yellow"
            variant="unstyled"
            index={tabIndex}
            onChange={setTabIndex}
          >
            <TabList>
              {statusTabs.map((tab) => (
                <Tab
                  key={tab.label}
                  fontWeight="bold"
                  _selected={{ color: tab.color }}
                >
                  <HStack>
                    <Text>{tab.label}</Text>
                    {ordersCount && ordersCount[tab.countKey] > 0 && (
                      <Badge
                        colorScheme={tab.color.split(".")[0]}
                        borderRadius="full"
                        px={2}
                        fontSize="xs"
                      >
                        {ordersCount[tab.countKey]}
                      </Badge>
                    )}
                  </HStack>
                </Tab>
              ))}
            </TabList>
            <TabPanels>
              {statusTabs.map((tab) => (
                <TabPanel key={tab.label}>
                  <Box position="relative" w="full" minH="180px">
                    {loading ? (
                      <Flex align="center" justify="center" minH="180px" py={8}>
                        <Loading />
                      </Flex>
                    ) : (
                      <Flex wrap="wrap" gap={6} pb={2}>
                        {orders?.length === 0 ? (
                          <Flex
                            direction="column"
                            align="center"
                            justify="center"
                            w="full"
                            py={12}
                          >
                            <Box mb={4} color="gray.300">
                              <MdInbox size={80} />
                            </Box>
                            <Text
                              fontWeight="bold"
                              fontSize="lg"
                              color="gray.500"
                              mb={2}
                            >
                              Nenhum pedido encontrado
                            </Text>
                            <Text
                              color="gray.400"
                              fontSize="md"
                              textAlign="center"
                              maxW="300px"
                            >
                              Não há pedidos para este status no momento. Assim
                              que um novo pedido chegar, ele aparecerá aqui!
                            </Text>
                          </Flex>
                        ) : (
                          orders?.map((order) => (
                            <OrderCard
                              key={order.id}
                              order={order}
                              onClick={() => {
                                onOpenDetails();
                                setCurrentOrderId(order.id);
                              }}
                              onChangeStatus={handleChangeOrderStatus}
                            />
                          ))
                        )}
                      </Flex>
                    )}
                  </Box>
                </TabPanel>
              ))}
            </TabPanels>
          </Tabs>
        </Stack>
      </Box>

      <OrderModal
        isOpen={isOpenDetails}
        onClose={() => {
          onCloseDetails();
          setCurrentOrderId(undefined);
        }}
        orderId={currentOrderId}
      />
    </>
  );
}
