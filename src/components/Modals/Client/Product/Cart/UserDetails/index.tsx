import { Box, FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import type { UserDetailsProps } from "./types";

const UserDetails = ({ error, phone, name, onChange }: UserDetailsProps) => {
  return (
    <Box borderWidth="1px" rounded="md" p={4} mt={4}>
      <Text mb={3} fontWeight="semibold" fontSize="lg">
        Dados pessoais
      </Text>

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
