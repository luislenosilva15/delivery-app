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
import type { CartModalProps, FormData } from "./types";
import CartCard from "@/components/Card/Client/Cart";
import { maskPhone } from "@/utils/mask";
import CartPayment from "./Payment";
import UserDetails from "./UserDetails";
import Delivery from "./Delivery";
import { useClient } from "@/hook/client";
import { moneyFormat } from "@/helpers/shared";
export const CartModal: React.FC<CartModalProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<FormData>({
    option: null,
    payment: null,
    subPayment: null,
    name: "",
    phone: "",
    delivery: {
      cep: "",
      street: "",
      number: "",
      complement: "",
      reference: "",
    },
  });

  const { submittingNewOrder } = useClient();

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

    if (!formData.option) {
      newError.option = "Escolha pelo menos uma opção";
      hasError = true;
    }

    if (!formData.payment) {
      newError.payment = "Escolha um método de pagamento";
      hasError = true;
    }

    if (
      formData.payment === "CREDIT_CARD" ||
      formData.payment === "DEBIT_CARD" ||
      formData.payment === "VOUCHER"
    ) {
      if (!formData.subPayment) {
        newError.payment = "Escolha a bandeira do cartão";
        hasError = true;
      }
    }

    if (!formData.name.trim()) {
      newError.name = "Nome é obrigatório";
      hasError = true;
    }
    if (!formData.phone.trim()) {
      newError.phone = "Telefone é obrigatório";
      hasError = true;
    }

    if (formData.option === "DELIVERY") {
      if (!formData.delivery.cep || formData.delivery.cep.trim().length < 8) {
        newError.option = "CEP é obrigatório e deve ter 8 dígitos";
        hasError = true;
      }
      if (!formData.delivery.street || !formData.delivery.street.trim()) {
        newError.option = "Rua é obrigatória";
        hasError = true;
      }
      if (!formData.delivery.number || !formData.delivery.number.trim()) {
        newError.option = "Número é obrigatório";
        hasError = true;
      }
    }

    setError(newError);

    if (!hasError) {
      onSubmit(formData);
    }
  };

  const handleChangePhone = (value: string) => {
    const maskedValue = maskPhone(value);
    setFormData((prev) => ({ ...prev, phone: maskedValue }));
  };

  const handleChangeFormDelivery = (
    field: keyof FormData["delivery"],
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      delivery: {
        ...prev.delivery,
        [field]: value,
      },
    }));
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
            <Text fontWeight="bold">{moneyFormat(total)}</Text>
          </Flex>

          <Delivery
            deliveryFormData={formData.delivery}
            error={error}
            handleChangeOption={(option) =>
              setFormData((prev) => ({
                ...prev,
                option: option as FormData["option"],
              }))
            }
            option={formData.option}
            handleChangeForm={handleChangeFormDelivery}
          />

          <CartPayment
            payment={formData.payment}
            subPayment={formData.subPayment}
            onChangePayment={(payment) =>
              setFormData((prev) => ({ ...prev, payment }))
            }
            onChangeSubPayment={(subPayment) =>
              setFormData((prev) => ({ ...prev, subPayment }))
            }
            error={{
              payment: error.payment,
            }}
          />

          <UserDetails
            error={{
              name: error.name,
              phone: error.phone,
            }}
            phone={formData.phone}
            name={formData.name}
            onChange={(field, value) => {
              if (field === "name") {
                setFormData((prev) => ({ ...prev, name: value }));
              } else if (field === "phone") {
                handleChangePhone(value);
              }
            }}
          />
        </ModalBody>

        <ModalFooter position="sticky" bottom={0} p={4}>
          <Button
            colorScheme="primary"
            w="full"
            onClick={handleSubmit}
            isLoading={submittingNewOrder}
            disabled={submittingNewOrder}
          >
            Fazer pedido
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
