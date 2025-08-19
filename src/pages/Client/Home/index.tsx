import { fetchCompanyRequest } from "@/store/features/client/clientSlice";
import {
  VStack,
  HStack,
  Text,
  Divider,
  Badge,
  Image,
  Spinner,
  Button,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useClient } from "@/hook/client";
import { cuisineLabel } from "@/utils/typeNormalize";

const ClientHomePage = () => {
  const dispatch = useDispatch();
  const { id: clientId } = useParams();
  const navigate = useNavigate();

  const { company, loading } = useClient();

  useEffect(() => {
    dispatch(
      fetchCompanyRequest({
        id: Number(clientId),
      })
    );
  }, [clientId, dispatch]);

  if (loading) {
    return (
      <VStack spacing={8} py={10} align="center" justifyContent="center">
        <Spinner size="xl2" />
      </VStack>
    );
  }

  if (!company) {
    return (
      <VStack spacing={8} py={10} align="center">
        <Text>Empresa não encontrada.</Text>
      </VStack>
    );
  }

  return (
    <VStack spacing={8} py={10} align="center">
      <Image src={company.logoUrl} alt="Logo Pizzaria" boxSize="100px" mb={2} />

      <VStack spacing={1}>
        <Text fontSize="2xl" fontWeight="bold">
          {company.name}
        </Text>
        <Text color="gray.500">Peça sua comida favorita!</Text>

        <HStack spacing={3} mt={2}>
          <Badge colorScheme="gray">{cuisineLabel[company.cuisineType]}</Badge>
          <Badge colorScheme={company.isOpen ? "green" : "red"}>
            {company.isOpen ? "Aberta" : "Fechada"}
          </Badge>
        </HStack>
      </VStack>

      <Divider w="60%" />

      <Button
        colorScheme="primary"
        width="60%"
        onClick={() => navigate(`/client/${clientId}/menu`)}
      >
        Ver cardápio
      </Button>

      {/* Footer */}
      <Text fontSize="sm" color="gray.400" mt={10}>
        Uma experiência <b>sistema beta</b>
      </Text>
    </VStack>
  );
};

export default ClientHomePage;
