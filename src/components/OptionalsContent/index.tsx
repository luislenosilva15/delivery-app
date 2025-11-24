import { useState } from "react";
import { Box, Button, Flex, Stack, useDisclosure } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import NewOptionalModal from "@/components/Modals/Optional/Create";
import type { FormData } from "@/components/Modals/Optional/Create/types";
import ConfirmModal from "@/components/Modals/ConfirmModal";
import { mockOptionals, type MockOptional } from "@/mocks/optionals";
import OptionalCard from "@/components/Card/Optional";

export default function OptionalsContent() {
  const [optionals, setOptionals] = useState<MockOptional[]>(mockOptionals);
  const [currentOptionalId, setCurrentOptionalId] = useState<number | null>(
    null
  );

  const {
    isOpen: isOpenOptionalModal,
    onClose: onCloseOptionalModal,
    onOpen: onOpenOptionalModal,
  } = useDisclosure();

  const {
    isOpen: isOpenDeleteModal,
    onClose: onCloseDeleteModal,
    onOpen: onOpenDeleteModal,
  } = useDisclosure();

  const handleCreateOptional = (
    data: FormData & { type: "simple" | "options" }
  ) => {
    const newOptional: MockOptional = {
      id: Math.max(...optionals.map((o) => o.id)) + 1,
      ...data,
      disabled: false,
      createdAt: new Date().toISOString(),
    };
    setOptionals((prev) => [newOptional, ...prev]);
    onCloseOptionalModal();
  };

  const handleDeleteOptional = () => {
    if (currentOptionalId) {
      setOptionals((prev) => prev.filter((o) => o.id !== currentOptionalId));
      onCloseDeleteModal();
    }
  };

  const handleToggleDisableOptional = (optionalId: number) => {
    setOptionals((prev) =>
      prev.map((o) =>
        o.id === optionalId ? { ...o, disabled: !o.disabled } : o
      )
    );
  };

  return (
    <>
      <Flex justify="space-between" align="center" mb={6}>
        <Box />
        <Button
          leftIcon={<AddIcon />}
          colorScheme="primary"
          onClick={onOpenOptionalModal}
        >
          Novo Opcional
        </Button>
      </Flex>

      {optionals.length === 0 ? (
        <Box
          textAlign="center"
          py={10}
          px={6}
          border="1px dashed"
          borderColor="gray.200"
          borderRadius="md"
        >
          <Box fontSize="4xl" mb={4} opacity={0.3}>
            🛒
          </Box>
          <Box fontSize="lg" fontWeight="semibold" mb={2}>
            Nenhum opcional encontrado
          </Box>
          <Box mb={4} color="gray.600">
            Adicione opcionais ao seu cardápio para que os clientes possam
            personalizar seus pedidos.
          </Box>
          <Button
            leftIcon={<AddIcon />}
            colorScheme="primary"
            onClick={onOpenOptionalModal}
          >
            Criar Primeiro Opcional
          </Button>
        </Box>
      ) : (
        <Stack spacing={4}>
          {optionals.map((optional) => (
            <OptionalCard
              key={optional.id}
              optional={optional}
              onEdit={(id) => {
                setCurrentOptionalId(id);
                // TODO: Implement edit
              }}
              onDelete={(id) => {
                setCurrentOptionalId(id);
                onOpenDeleteModal();
              }}
              onDisable={(id) => handleToggleDisableOptional(id)}
            />
          ))}
        </Stack>
      )}

      <NewOptionalModal
        isOpen={isOpenOptionalModal}
        onClose={onCloseOptionalModal}
        onSubmit={handleCreateOptional}
      />

      <ConfirmModal
        isOpen={isOpenDeleteModal}
        onClose={onCloseDeleteModal}
        onSave={handleDeleteOptional}
        title="Excluir Opcional"
        description="Tem certeza que deseja excluir este opcional? Esta ação não pode ser desfeita."
      />
    </>
  );
}
