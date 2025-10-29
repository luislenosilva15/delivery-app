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
import { FaClock, FaWhatsapp, FaArrowLeft } from "react-icons/fa";
import { motion } from "framer-motion";
import { useClient } from "@/hook/client";
import Loading from "@/components/Loading";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchCurrentOrderRequest } from "@/store/features/client/clientSlice";
import { moneyFormat } from "@/helpers/shared";
import { OrderDetails } from "@/components/Modals/Client/Order/Details";
import {
  clientOrderStatusTranslations,
  orderStatusCardColor,
} from "@/constants";
import { LuCookingPot } from "react-icons/lu";

const MotionHStack = motion(HStack);

export default function OrderTracking() {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const dispatch = useDispatch();

  const cardBg = useColorModeValue("white", "gray.800");
  const textSecondary = useColorModeValue("gray.600", "gray.400");
  const dividerColor = useColorModeValue("gray.200", "gray.700");

  const {
    isOpen: isOpenDetailsModal,
    onOpen: onOpenDetailsModal,
    onClose: onCloseDetailsModal,
  } = useDisclosure();

  const { loadingOrder, currentOrder, company } = useClient();

  const onBack = () => navigate(-1);

  const animation = { scale: [1, 1.05, 1] };

  useEffect(() => {
    dispatch(
      fetchCurrentOrderRequest({
        orderId: Number(orderId),
      })
    );
  }, [dispatch, orderId]);

  if (loadingOrder || !currentOrder) return <Loading />;

  const status = currentOrder.status;

  const pendingColor =
    status === "PENDING" ? orderStatusCardColor[currentOrder.status] : "green";

  const readyColor =
    status === "READY" || status === "IN_PREPARATION" ? "yellow" : "green";

  const pendingText =
    status === "PENDING"
      ? clientOrderStatusTranslations["PENDING"]
      : "Pedido Aceito";

  const readyText =
    status === "READY" || status === "IN_PREPARATION"
      ? clientOrderStatusTranslations["IN_PREPARATION"]
      : "Pedido pronto";

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
              <Icon as={FaClock} boxSize={5} />
              <Text fontWeight="semibold">Pedido enviado!</Text>
            </MotionHStack>
            <Text fontSize="sm" color={textSecondary}>
              Aguardando a confirmação da loja
            </Text>
          </CardBody>
        </Card>

        {/* PENDING */}
        <VStack align="start" spacing={6} mb={6} pl={2}>
          <MotionHStack
            animate={status === "PENDING" ? animation : false}
            transition={{ duration: 1.2, repeat: Infinity }}
          >
            <Icon as={FaClock} color={pendingColor} />
            <Text fontWeight="semibold">{pendingText}</Text>
          </MotionHStack>

          {/* READY */}
          <MotionHStack
            animate={
              status === "READY" || status === "IN_PREPARATION"
                ? animation
                : false
            }
            transition={{ duration: 1.2, repeat: Infinity }}
          >
            <Icon as={LuCookingPot} color={readyColor} />
            <Text fontWeight="semibold">{readyText}</Text>
          </MotionHStack>

          <MotionHStack
            animate={status === "OUT_FOR_DELIVERY" ? animation : false}
            transition={{ duration: 1.2, repeat: Infinity }}
          >
            <Icon as={LuCookingPot} color={readyColor} />
            <Text fontWeight="semibold">{readyText}</Text>
          </MotionHStack>
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
                colorScheme="primary"
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
