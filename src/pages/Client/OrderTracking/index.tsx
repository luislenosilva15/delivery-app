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
  useDisclosure,
} from "@chakra-ui/react";
import {
  FaClock,
  FaWhatsapp,
  FaArrowLeft,
  FaMotorcycle,
  FaStore,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useClient } from "@/hook/client";
import Loading from "@/components/Loading";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchLastOrderRequest } from "@/store/features/client/clientSlice";
import { moneyFormat, formatDate } from "@/helpers/shared";
import { OrderDetails } from "@/components/Modals/Client/Order/Details";
import { LuCookingPot } from "react-icons/lu";
import Error from "@/components/Error";

const MotionHStack = motion(HStack);

export default function OrderTracking() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cardBg = useColorModeValue("white", "gray.800");
  const textSecondary = useColorModeValue("gray.600", "gray.400");
  const dividerColor = useColorModeValue("gray.200", "gray.700");

  const {
    isOpen: isOpenDetailsModal,
    onOpen: onOpenDetailsModal,
    onClose: onCloseDetailsModal,
  } = useDisclosure();

  const { loadingOrder, currentOrder, company, errorMessage } = useClient();

  const onBack = () => navigate(-1);

  const animation = { scale: [1, 1.05, 1] };

  useEffect(() => {
    dispatch(fetchLastOrderRequest());
  }, [dispatch]);

  if (errorMessage) {
    return <Error message={errorMessage} />;
  }

  if (loadingOrder || !currentOrder) return <Loading />;

  const status = currentOrder.status;
  const isLocalPickup = currentOrder.deliveryMethod === "LOCAL";

  return (
    <>
      <Box maxW="600px" mx="auto" p={6}>
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

        <Card mb={4} shadow="md" borderRadius="xl" bg={cardBg}>
          <CardBody textAlign="center">
            <MotionHStack
              justify="center"
              spacing={3}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Icon
                as={
                  status === "PENDING"
                    ? FaClock
                    : status === "IN_PREPARATION" || status === "READY"
                    ? LuCookingPot
                    : status === "OUT_FOR_DELIVERY"
                    ? isLocalPickup
                      ? FaStore
                      : FaMotorcycle
                    : status === "DELIVERED"
                    ? FaClock
                    : FaClock
                }
                boxSize={5}
                color={
                  status === "PENDING"
                    ? "yellow.500"
                    : status === "IN_PREPARATION" || status === "READY"
                    ? "purple.500"
                    : status === "OUT_FOR_DELIVERY"
                    ? "blue.500"
                    : status === "DELIVERED"
                    ? "green.500"
                    : "gray.500"
                }
              />
              <Text fontWeight="semibold">
                {status === "PENDING"
                  ? "Pedido enviado!"
                  : status === "IN_PREPARATION"
                  ? "Pedido em preparo!"
                  : status === "READY"
                  ? "Pedido aceito!"
                  : status === "OUT_FOR_DELIVERY"
                  ? isLocalPickup
                    ? "Pronto para retirada! 🍽️"
                    : "Saiu para entrega! 🏍️"
                  : status === "DELIVERED"
                  ? isLocalPickup
                    ? "Pedido retirado!"
                    : "Pedido entregue!"
                  : "Pedido enviado!"}
              </Text>
            </MotionHStack>
            <Text fontSize="sm" color={textSecondary}>
              {status === "PENDING"
                ? "Aguardando a confirmação da loja"
                : status === "IN_PREPARATION"
                ? "Sua comida está sendo preparada com carinho"
                : status === "READY"
                ? "Pedido foi aceito e está sendo preparado"
                : status === "OUT_FOR_DELIVERY"
                ? isLocalPickup
                  ? "Seu pedido está pronto! Pode vir buscar na loja 🏪"
                  : "Nosso entregador está vindo até você! Fique atento 📱"
                : status === "DELIVERED"
                ? isLocalPickup
                  ? "Seu pedido foi retirado com sucesso!"
                  : "Seu pedido foi entregue com sucesso!"
                : "Aguardando confirmação"}
            </Text>
          </CardBody>
        </Card>

        {/* TRACKING STEPS */}
        <VStack align="start" spacing={6} mb={6} pl={2}>
          {/* PENDING/ACCEPTED */}
          <MotionHStack
            animate={status === "PENDING" ? animation : false}
            transition={{ duration: 1.2, repeat: Infinity }}
          >
            <Icon
              as={FaClock}
              color={
                status === "PENDING"
                  ? "yellow.500"
                  : status === "IN_PREPARATION" ||
                    status === "READY" ||
                    status === "OUT_FOR_DELIVERY" ||
                    status === "DELIVERED"
                  ? "green.500"
                  : "gray.400"
              }
            />
            <Text
              fontWeight="semibold"
              color={
                status === "PENDING"
                  ? "inherit"
                  : status === "IN_PREPARATION" ||
                    status === "READY" ||
                    status === "OUT_FOR_DELIVERY" ||
                    status === "DELIVERED"
                  ? "inherit"
                  : "gray.400"
              }
            >
              {status === "PENDING"
                ? "Aguardando confirmação"
                : "Pedido aceito"}
            </Text>
          </MotionHStack>

          {/* PREPARATION */}
          <MotionHStack
            animate={
              status === "IN_PREPARATION" || status === "READY"
                ? animation
                : false
            }
            transition={{ duration: 1.2, repeat: Infinity }}
          >
            <Icon
              as={LuCookingPot}
              color={
                status === "IN_PREPARATION" || status === "READY"
                  ? "purple.500"
                  : status === "OUT_FOR_DELIVERY" || status === "DELIVERED"
                  ? "green.500"
                  : "gray.400"
              }
            />
            <Text
              fontWeight="semibold"
              color={
                status === "IN_PREPARATION" || status === "READY"
                  ? "inherit"
                  : status === "OUT_FOR_DELIVERY" || status === "DELIVERED"
                  ? "inherit"
                  : "gray.400"
              }
            >
              Em preparo
            </Text>
          </MotionHStack>

          {/* DELIVERY/PICKUP */}
          <HStack justify="space-between" width="100%">
            <HStack>
              <Icon
                as={isLocalPickup ? FaStore : FaMotorcycle}
                color={
                  status === "OUT_FOR_DELIVERY" || status === "DELIVERED"
                    ? isLocalPickup
                      ? "green.500"
                      : "blue.500"
                    : "gray.400"
                }
              />
              <Text
                fontWeight="semibold"
                color={
                  status === "OUT_FOR_DELIVERY" || status === "DELIVERED"
                    ? "inherit"
                    : "gray.400"
                }
              >
                {isLocalPickup ? "Pronto para retirada" : "Saiu para entrega"}
              </Text>
            </HStack>
            {(status === "OUT_FOR_DELIVERY" || status === "DELIVERED") && (
              <Text fontSize="xs" color={textSecondary} fontWeight="medium">
                {formatDate(currentOrder.updatedAt)}
              </Text>
            )}
          </HStack>
        </VStack>

        <Divider mb={6} borderColor={dividerColor} />

        <Card shadow="md" borderRadius="xl" bg={cardBg}>
          <CardBody>
            <HStack justify="space-between">
              <HStack>
                <Box>
                  <Text fontWeight="semibold">{company?.name}</Text>
                  <Text fontSize="sm" color={textSecondary}>
                    {moneyFormat(currentOrder.totalPrice)}
                  </Text>
                </Box>
              </HStack>
              <Text fontSize="xs" color={textSecondary}>
                #{currentOrder.id}
              </Text>
            </HStack>

            <Flex mt={4} gap={3}>
              <Button
                leftIcon={<FaWhatsapp />}
                colorScheme="green"
                variant="outline"
                flex="1"
              >
                Iniciar conversa
              </Button>
              <Button
                colorScheme="primary"
                flex="1"
                onClick={onOpenDetailsModal}
              >
                Ver pedido
              </Button>
            </Flex>
          </CardBody>
        </Card>
      </Box>

      <OrderDetails
        isOpen={isOpenDetailsModal}
        onClose={onCloseDetailsModal}
        order={currentOrder}
      />
    </>
  );
}
