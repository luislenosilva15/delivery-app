import {
  normalizeOpeningHours,
  type NormalizedDay,
} from "@/helpers/normalizeOpeningHour";
import { useAuth } from "@/hook/auth";
import { setTemporaryClosedRequest } from "@/store/features/auth/authSlice";
import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuList,
  Switch,
  Text,
  VStack,
  HStack,
  Divider,
  useColorModeValue,
} from "@chakra-ui/react";
import { useMemo } from "react";
import { MdStore } from "react-icons/md";
import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

function OpeningHourButton() {
  const { company } = useAuth();

  const isClosed = !!company?.temporaryClosed;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleConfigureOpeningHours = () => {
    navigate("/opening-hour");
  };

  const textColor = useColorModeValue("gray.800", "gray.100");

  const openingHours = useMemo((): NormalizedDay[] => {
    console.log(company?.openingHours);
    if (company?.openingHours) {
      return normalizeOpeningHours(company.openingHours);
    }
    return [];
  }, [company]);

  const toggleTemporaryClosed = () => {
    dispatch(setTemporaryClosedRequest({ closed: isClosed }));
  };

  return (
    <Box>
      <Menu>
        <MenuButton
          as={Button}
          variant="ghost"
          leftIcon={<MdStore />}
          colorScheme={isClosed ? "red" : "green"}
        >
          {isClosed ? "Fechado" : "Aberto"}
        </MenuButton>

        <MenuList p={4}>
          <Text fontWeight="bold" fontSize="lg" mb={2}>
            Horário de Funcionamento
          </Text>
          <Text
            fontSize="sm"
            color="primary.500"
            cursor="pointer"
            mb={3}
            _hover={{ textDecoration: "underline" }}
            onClick={handleConfigureOpeningHours}
          >
            Configurar horários
          </Text>

          <VStack align="stretch" spacing={4}>
            <HStack justify="space-between">
              <Box>
                <Text fontWeight="medium">Fechar Temporariamente</Text>
                <Text fontSize="xs" color="gray.500">
                  Essa opção fechará o estabelecimento temporariamente
                </Text>
              </Box>
              <Switch
                ml={1}
                colorScheme="red"
                isChecked={isClosed}
                onChange={toggleTemporaryClosed}
              />
            </HStack>

            <Divider />

            <HStack justify="space-between" align="start">
              <Box>
                <Text fontWeight="medium" mb={2}>
                  Delivery & Retirada
                </Text>

                <VStack align="start" spacing={1}>
                  {openingHours.map((item) => (
                    <HStack key={item.day} spacing={3} align="center">
                      <Text fontWeight="semibold" minW="130px">
                        {item.day}
                      </Text>
                      <Text
                        color={
                          item.status === "Fechado" ? "red.500" : textColor
                        }
                      >
                        {item.status}
                      </Text>
                    </HStack>
                  ))}

                  {company?.isAlwaysOpening && (
                    <HStack spacing={3} align="center">
                      <Text fontSize="sm" color="gray.500">
                        Sempre Aberto(24h)
                      </Text>
                    </HStack>
                  )}
                </VStack>
              </Box>
            </HStack>
          </VStack>
        </MenuList>
      </Menu>
    </Box>
  );
}

export default OpeningHourButton;
