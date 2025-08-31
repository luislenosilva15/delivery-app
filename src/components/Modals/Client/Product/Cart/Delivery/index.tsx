import { Box, Radio, RadioGroup, Stack, Text } from "@chakra-ui/react";
import type { DeliveryProps } from "./types";
import { useClient } from "@/hook/client";

const Delivery = ({ error, handleChangeOption, option }: DeliveryProps) => {
  const { company } = useClient();

  const hasDelivery = company?.availability.includes("DELIVERY");
  const hasLocal = company?.availability.includes("LOCAL");

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
          {hasDelivery && (
            <Radio colorScheme="primary" value="delivery">
              Entrega
            </Radio>
          )}
          {hasLocal && (
            <Radio colorScheme="primary" value="pickup">
              Retirada no local
            </Radio>
          )}
        </Stack>
      </RadioGroup>
      {error.option && (
        <Text color="red.500" fontSize="sm" mt={2}>
          {error.option}
        </Text>
      )}
    </Box>
  );
};

export default Delivery;
