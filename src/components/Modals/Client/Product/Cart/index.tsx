import { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Box,
  Flex,
  Text,
  RadioGroup,
  Stack,
  Radio,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import type { CartModalProps } from "./types";
import CartCard from "@/components/Card/Client/Cart";
import { useClient } from "@/hook/client";
import { maskPhone } from "@/utils/mask";

export const CartModal: React.FC<CartModalProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onSubmit,
}) => {
  const [option, setOption] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState({
    option: "",
    name: "",
    phone: "",
  });

  const { company } = useClient();

  const hasDelivery = company?.availability.includes("DELIVERY");
  const hasLocal = company?.availability.includes("LOCAL");

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleSubmit = () => {
    const newError = { option: "", name: "", phone: "" };
    let hasError = false;

    if (!option) {
      newError.option = "Escolha pelo menos uma opção";
      hasError = true;
    }

    if (option === "delivery") {
      if (!name.trim()) {
        newError.name = "Nome é obrigatório";
        hasError = true;
      }
      if (!phone.trim()) {
        newError.phone = "Telefone é obrigatório";
        hasError = true;
      }
    }

    setError(newError);

    if (!hasError) {
      // onSubmit({ option, name, phone });
    }
  };

  useEffect(() => {
    if (option) setError((prev) => ({ ...prev, option: "" }));
  }, [option]);

  useEffect(() => {
    if (name) setError((prev) => ({ ...prev, name: "" }));
  }, [name]);

  useEffect(() => {
    if (phone) setError((prev) => ({ ...prev, phone: "" }));
  }, [phone]);

  const handleChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    const maskedValue = maskPhone(value);

    setPhone(maskedValue);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="6xl" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Meu pedido</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          {items.map((item) => (
            <CartCard
              key={item.id}
              item={item}
              onUpdateQuantity={onUpdateQuantity}
            />
          ))}

          <Flex justify="space-between" mb={8}>
            <Text fontWeight="bold">Total</Text>
            <Text fontWeight="bold">R$ {total.toFixed(2)}</Text>
          </Flex>

          <Box
            borderWidth="1px"
            borderColor={error.option ? "red.400" : "gray.600"}
            rounded="md"
            p={4}
            mt={2}
          >
            <Text mb={3} fontWeight="semibold" fontSize="lg">
              Escolha uma opção
            </Text>
            <RadioGroup onChange={setOption} value={option as string}>
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

          <Box
            borderWidth="1px"
            borderColor="gray.600"
            rounded="md"
            p={4}
            mt={4}
          >
            <Text mb={3} fontWeight="semibold" fontSize="lg">
              Dados pessoais
            </Text>

            <FormControl isInvalid={!!error.name} mb={4} isRequired>
              <FormLabel>Nome</FormLabel>
              <Input
                placeholder="Seu nome"
                value={name}
                focusBorderColor="primary.500"
                onChange={(e) => setName(e.target.value)}
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
                onChange={handleChangePhone}
              />
              {error.phone && (
                <Text color="red.500" fontSize="sm" mt={1}>
                  {error.phone}
                </Text>
              )}
            </FormControl>
          </Box>
        </ModalBody>

        <ModalFooter position="sticky" bottom={0} p={4}>
          <Button colorScheme="primary" w="full" onClick={handleSubmit}>
            Fazer pedido
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
