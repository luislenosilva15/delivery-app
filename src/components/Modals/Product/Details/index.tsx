import React, { useEffect, useState } from "react";
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
  Image,
  Badge,
  VStack,
  HStack,
  Divider,
  Box,
  Spinner,
  useColorModeValue,
} from "@chakra-ui/react";
import type { Props } from "./types";
import { useMenu } from "@/hook/menu";
import { useDispatch } from "react-redux";
import { fetchCurrentProductRequest } from "@/store/features/menu/menuSlice";

import emptyImage from "../../../../assets/emptyImage.png";
import { formatDate } from "@/utils/data";
import { daysOfWeek } from "@/constants";

export const ProductModalDetails = ({ isOpen, onClose, productId }: Props) => {
  const borderColor = useColorModeValue("gray.200", "gray.700");

  const dispatch = useDispatch();

  const { currentProduct: product, loadingCurrentProduct: loading } = useMenu();

  useEffect(() => {
    if (!productId) return;

    dispatch(fetchCurrentProductRequest({ productId }));
  }, [dispatch, isOpen, productId]);

  const availability = {
    DELIVERY: "Delivery",
    LOCAL: "Local",
    BOTH: "Delivery e Local",
  };

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
        <ModalHeader>{product?.name || "Carregando..."}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {loading ? (
            <Box display="flex" justifyContent="center" py={10}>
              <Spinner size="xl" />
            </Box>
          ) : product ? (
            <VStack spacing={4} align="stretch">
              <Image
                src={product.image || emptyImage}
                alt={product.name}
                borderRadius="md"
                maxH="200px"
                objectFit="contain"
                mb={2}
              />

              <HStack spacing={2} wrap="wrap">
                <Badge colorScheme={product.disabled ? "red" : "green"}>
                  {product.disabled ? "Indisponível" : "Ativo"}
                </Badge>

                {product.isAdultOnly && (
                  <Badge colorScheme="purple">Apenas para +18 anos</Badge>
                )}
              </HStack>

              <Divider />

              {product.code && (
                <Box>
                  <Text fontWeight="bold">Código:</Text>
                  <Text>{product.code}</Text>
                </Box>
              )}

              <Box>
                <Text fontWeight="bold">Descrição:</Text>
                <Text>{product.description || "Sem descrição"}</Text>
              </Box>

              <Box>
                <Text fontWeight="bold">Preço:</Text>
                <Text>R$ {product.price.toFixed(2)}</Text>
              </Box>

              <Box>
                <Text fontWeight="bold">Disponível por:</Text>
                <Text>{availability[product.productAvailabilityBy]}</Text>
              </Box>

              {product.productHours && product.productHours.length > 0 && (
                <Box>
                  <Text fontWeight="bold" mb={2}>
                    Horários:
                  </Text>
                  <VStack align="start" spacing={1}>
                    {Object.values(
                      product.productHours.reduce<
                        Record<number, typeof product.productHours>
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
                <HStack
                  alignItems={"flex-start"}
                  spacing={1}
                  flexDirection="column"
                  display="flex"
                >
                  <Text fontWeight="bold">Criado em:</Text>
                  <Text>{formatDate(product.createdAt)}</Text>
                </HStack>
                <HStack
                  alignItems={"flex-start"}
                  spacing={1}
                  flexDirection="column"
                  display="flex"
                >
                  <Text fontWeight="bold">Atualizado em:</Text>
                  <Text>{formatDate(product.updatedAt)}</Text>
                </HStack>
              </Box>
            </VStack>
          ) : (
            <Text>Produto não encontrado.</Text>
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
