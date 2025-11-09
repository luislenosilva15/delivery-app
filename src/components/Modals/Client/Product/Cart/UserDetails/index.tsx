import { Box, FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import type { UserDetailsProps } from "./types";
import { maskCpfCnpj } from "@/utils/mask";
import { useClient } from "@/hook/client";

const UserDetails = ({
  error,
  phone,
  name,
  documentInTicket,
  onChange,
}: UserDetailsProps) => {
  const { company } = useClient();

  return (
    <Box borderWidth="1px" rounded="md" p={4} mt={4}>
      <Text mb={3} fontWeight="semibold" fontSize="lg">
        Dados pessoais
      </Text>

      {company?.companyPayment.documentInTicket && (
        <FormControl isInvalid={!!error.name} mb={4}>
          <FormLabel>Inserir CPF/CNPJ na nota fiscal</FormLabel>
          <Input
            placeholder="000.000.000-00 ou 00.000.000/0000-00"
            value={documentInTicket}
            focusBorderColor="primary.500"
            onChange={(e) =>
              onChange("documentInTicket", maskCpfCnpj(e.target.value))
            }
          />
          {error.documentInTicket && (
            <Text color="red.500" fontSize="sm" mt={1}>
              {error.documentInTicket}
            </Text>
          )}
        </FormControl>
      )}

      <FormControl isInvalid={!!error.name} mb={4} isRequired>
        <FormLabel>Nome</FormLabel>
        <Input
          placeholder="Seu nome"
          value={name}
          focusBorderColor="primary.500"
          onChange={(e) => onChange("name", e.target.value)}
        />
        {error.name && (
          <Text color="red.500" fontSize="sm" mt={1}>
            {error.name}
          </Text>
        )}
      </FormControl>

      <FormControl isInvalid={!!error.phone} mb={4} isRequired>
        <FormLabel>Telefone</FormLabel>
        <Input
          focusBorderColor="primary.500"
          placeholder="(00) 00000-0000"
          value={phone}
          onChange={(e) => onChange("phone", e.target.value)}
        />
        {error.phone && (
          <Text color="red.500" fontSize="sm" mt={1}>
            {error.phone}
          </Text>
        )}
      </FormControl>
    </Box>
  );
};

export default UserDetails;
