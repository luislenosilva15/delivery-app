import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Flex,
  Text,
} from "@chakra-ui/react";
import type { CartModalProps, Payment, SubPayment } from "./types";
import CartCard from "@/components/Card/Client/Cart";
import { maskPhone } from "@/utils/mask";
import CartPayment from "./Payment";
import UserDetails from "./UserDetails";
import Delivery from "./Delivery";

export const CartModal: React.FC<CartModalProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onSubmit,
}) => {
  const [option, setOption] = useState<string | null>(null);
  const [payment, setPayment] = useState<Payment>(null);
  const [subPayment, setSubPayment] = useState<SubPayment>(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState({
    option: "",
    payment: "",
    name: "",
    phone: "",
  });

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleSubmit = () => {
    const newError = { option: "", payment: "", name: "", phone: "" };
    let hasError = false;

    if (!option) {
      newError.option = "Escolha pelo menos uma opção";
      hasError = true;
    }

    if (!payment) {
      newError.payment = "Escolha um método de pagamento";
      hasError = true;
    }

    if (
      payment === "CREDIT_CARD" ||
      payment === "DEBIT_CARD" ||
      payment === "VOUCHER"
    ) {
      if (!subPayment) {
        newError.payment = "Escolha a bandeira do cartão";
        hasError = true;
      }
    }
    if (!name.trim()) {
      newError.name = "Nome é obrigatório";
      hasError = true;
    }
    if (!phone.trim()) {
      newError.phone = "Telefone é obrigatório";
      hasError = true;
    }

    setError(newError);

    if (!hasError) {
      onSubmit();
    }
  };

  const handleChangePhone = (value: string) => {
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

          <Delivery
            error={error}
            handleChangeOption={setOption}
            option={option}
          />

          <CartPayment
            payment={payment}
            subPayment={subPayment}
            onChangePayment={(payment) => {
              setPayment(payment);
            }}
            onChangeSubPayment={(subPayment) => {
              setSubPayment(subPayment);
            }}
            error={{
              payment: error.payment,
            }}
          />

          <UserDetails
            error={{
              name: error.name,
              phone: error.phone,
            }}
            phone={phone}
            name={name}
            onChange={(field, value) => {
              if (field === "name") {
                setName(value);
              } else if (field === "phone") {
                handleChangePhone(value);
              }
            }}
          />
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
