import { useEffect } from "react";
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
  Badge,
  VStack,
  HStack,
  Divider,
  Box,
  Spinner,
} from "@chakra-ui/react";
import type { Props } from "./types";
import { useMenu } from "@/hook/menu";
import { useDispatch } from "react-redux";
import { fetchCurrentGroupRequest } from "@/store/features/menu/menuSlice";
import { formatDate } from "@/utils/data";
import { daysOfWeek } from "@/constants";

export const GroupModalDetails = ({ isOpen, onClose, groupId }: Props) => {
  const dispatch = useDispatch();

  const { currentGroup: group, loadingCurrentGroup: loading } = useMenu();

  useEffect(() => {
    if (!groupId) return;
    dispatch(fetchCurrentGroupRequest({ groupId }));
  }, [dispatch, isOpen, groupId]);

  const getDayName = (dayOfWeek: number) => {
    return daysOfWeek[dayOfWeek] || "";
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="xl"
      isCentered
      scrollBehavior="inside"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{group?.name || "Carregando..."}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {loading ? (
            <Box display="flex" justifyContent="center" py={10}>
              <Spinner size="xl" />
            </Box>
          ) : group ? (
            <VStack spacing={4} align="stretch">
              <HStack spacing={2} wrap="wrap">
                <Badge colorScheme={group.disabled ? "red" : "green"}>
                  {group.disabled ? "Indisponível" : "Ativo"}
                </Badge>
              </HStack>

              <Divider />

              <Box>
                <Text fontWeight="bold">Nome:</Text>
                <Text>{group.name}</Text>
              </Box>

              <Box>
                <Text fontWeight="bold">Disponibilidade:</Text>
                <Text>
                  {group.alwaysAvailable
                    ? "Sempre disponível"
                    : "Disponível em horários específicos"}
                </Text>
              </Box>

              {/* Horários no mesmo padrão do produto */}
              {!group.alwaysAvailable && group.menuHours.length > 0 && (
                <Box>
                  <Text fontWeight="bold" mb={2}>
                    Horários:
                  </Text>
                  <VStack align="start" spacing={1}>
                    {Object.values(
                      group.menuHours.reduce<
                        Record<number, typeof group.menuHours>
                      >((acc, hour) => {
                        if (!acc[hour.dayOfWeek]) acc[hour.dayOfWeek] = [];
                        acc[hour.dayOfWeek].push(hour);
                        return acc;
                      }, {})
                    ).map((hoursPerDay) => {
                      const dayOfWeek = hoursPerDay[0].dayOfWeek;
                      const closed = hoursPerDay.every((h) => h.closed);

                      return (
                        <HStack key={dayOfWeek} spacing={2}>
                          <Text fontWeight="bold">
                            {getDayName(dayOfWeek)}:
                          </Text>
                          <Text>
                            {closed
                              ? "Fechado"
                              : hoursPerDay
                                  .map((h) => `${h.startTime} - ${h.endTime}`)
                                  .join(", ")}
                          </Text>
                        </HStack>
                      );
                    })}
                  </VStack>
                </Box>
              )}

              <Box
                display="flex"
                flexDirection="column"
                gap={2}
                alignItems="flex-start"
              >
                {group.createdAt && (
                  <HStack
                    alignItems={"flex-start"}
                    spacing={1}
                    flexDirection="column"
                    display="flex"
                  >
                    <Text fontWeight="bold">Criado em:</Text>
                    <Text>{formatDate(group.createdAt)}</Text>
                  </HStack>
                )}
                {group.updatedAt && (
                  <HStack
                    alignItems={"flex-start"}
                    spacing={1}
                    flexDirection="column"
                    display="flex"
                  >
                    <Text fontWeight="bold">Atualizado em:</Text>
                    <Text>{formatDate(group.updatedAt)}</Text>
                  </HStack>
                )}
              </Box>
            </VStack>
          ) : (
            <Text>Grupo não encontrado.</Text>
          )}
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="primary" mr={3} onClick={onClose}>
            Fechar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
