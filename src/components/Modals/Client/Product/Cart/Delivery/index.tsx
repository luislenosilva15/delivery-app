import {
  Box,
  Radio,
  RadioGroup,
  Stack,
  Text,
  Input,
  FormLabel,
} from "@chakra-ui/react";
import type { DeliveryProps } from "./types";
import { useClient } from "@/hook/client";
import { maskCEP } from "@/utils/mask";
import { useEffect } from "react";

const Delivery = ({
  error,
  handleChangeOption,
  option,
  handleChangeForm,
  deliveryFormData,
}: DeliveryProps) => {
  const { company } = useClient();

  const hasDelivery = company?.availability.includes("DELIVERY");
  const hasLocal = company?.availability.includes("LOCAL");

  useEffect(() => {
    const cep = deliveryFormData?.cep?.replace("-", "");

    if (!cep || cep.length < 8) return;

    const fetchAddress = async () => {
      try {
        const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await res.json();

        if (!data.erro) {
          if (data.logradouro && data.logradouro !== deliveryFormData.street) {
            handleChangeForm("street", data.logradouro);
          }
        }
      } catch {
        if (deliveryFormData.street) handleChangeForm("street", "");
        if (deliveryFormData.complement) handleChangeForm("complement", "");
      }
    };

    fetchAddress();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deliveryFormData?.cep]);

  return (
    <Box borderWidth="1px" rounded="md" p={4} mt={2}>
      <Text mb={3} fontWeight="semibold" fontSize="lg">
        Escolha uma opção
      </Text>
      <RadioGroup
        onChange={(value) => handleChangeOption(value)}
        value={option as string}
      >
        <Stack direction="column" spacing={3}>
          {hasLocal && (
            <Radio colorScheme="primary" value="LOCAL">
              Retirada no local
            </Radio>
          )}
          {hasDelivery && (
            <Radio colorScheme="primary" value="DELIVERY">
              Entrega
            </Radio>
          )}
        </Stack>
      </RadioGroup>
      {error.option && (
        <Text color="red.500" fontSize="sm" mt={2}>
          {error.option}
        </Text>
      )}

      {option === "DELIVERY" && (
        <Box mt={4}>
          <FormLabel htmlFor="cep">CEP</FormLabel>
          <Input
            id="cep"
            placeholder="Digite o CEP"
            mb={3}
            onChange={(e) => handleChangeForm("cep", maskCEP(e.target.value))}
            maxLength={9}
            value={deliveryFormData.cep}
          />

          <FormLabel htmlFor="street">Rua</FormLabel>
          <Input
            id="street"
            placeholder="Rua, avenida..."
            mb={3}
            onChange={(e) => handleChangeForm("street", e.target.value)}
            value={deliveryFormData.street}
          />

          <FormLabel htmlFor="number">Número</FormLabel>
          <Input
            id="number"
            placeholder="Número"
            mb={3}
            onChange={(e) => handleChangeForm("number", e.target.value)}
            value={deliveryFormData.number}
          />

          <FormLabel htmlFor="complement">Complemento</FormLabel>
          <Input
            id="complement"
            placeholder="Apto, casa..."
            mb={3}
            onChange={(e) => handleChangeForm("complement", e.target.value)}
            value={deliveryFormData.complement}
          />

          <FormLabel htmlFor="reference">Ponto de referência</FormLabel>
          <Input
            id="reference"
            placeholder="Ex: perto da padaria"
            onChange={(e) => handleChangeForm("reference", e.target.value)}
            value={deliveryFormData.reference}
          />
        </Box>
      )}
    </Box>
  );
};

export default Delivery;
