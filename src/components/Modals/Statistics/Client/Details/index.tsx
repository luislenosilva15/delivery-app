import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  VStack,
  Divider,
  Box,
} from "@chakra-ui/react";
import type { Props } from "./types";

import { formatDate, moneyFormat } from "@/helpers/shared";

export const ClientModalDetails = ({ isOpen, onClose, client }: Props) => {
  const handleWhatsApp = () => {
    if (client?.phone) {
      const url = `https://wa.me/${client.phone.replace(/\D/g, "")}`;
      window.open(url, "_blank");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      isCentered
      scrollBehavior="inside"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{"Detalhes do Cliente"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {client ? (
            <VStack spacing={4} align="stretch">
              <Divider />

              <Box>
                <Text fontWeight="bold">Nome:</Text>
                <Text>{client.name}</Text>
              </Box>

              {client.phone && (
                <Box>
                  <Text fontWeight="bold">Telefone:</Text>
                  <Text>{client.phone}</Text>
                </Box>
              )}

              {client.firstOrderDate && (
                <Box>
                  <Text fontWeight="bold">Primeiro pedido:</Text>
                  <Text>{formatDate(client.firstOrderDate)}</Text>
                </Box>
              )}

              {client.lastOrderDate && (
                <Box>
                  <Text fontWeight="bold">Último pedido:</Text>
                  <Text>{formatDate(client.lastOrderDate)} </Text>
                </Box>
              )}

              <Box>
                <Text fontWeight="bold">Quantidade de pedidos:</Text>
                <Text>{client.ordersCount ?? 0}</Text>
              </Box>

              {client.totalSpent !== undefined && (
                <Box>
                  <Text fontWeight="bold">Total gasto:</Text>
                  <Text>{moneyFormat(client.totalSpent)}</Text>
                </Box>
              )}
            </VStack>
          ) : (
            <Text>Cliente não encontrado.</Text>
          )}
        </ModalBody>

        <ModalFooter>
          {client?.phone && (
            <Button colorScheme="green" mr={3} onClick={handleWhatsApp}>
              Chamar no WhatsApp
            </Button>
          )}
          <Button colorScheme="primary" onClick={onClose}>
            Fechar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
