import {
  Box,
  Button,
  Checkbox,
  FormControl,
  Heading,
  InputGroup,
  InputLeftAddon,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Radio,
  RadioGroup,
  Stack,
  Text,
  VStack,
  HStack,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { AddIcon, CloseIcon } from "@chakra-ui/icons";
import Breadcrumb from "@/components/Breadcrumb";
import type { FormData, DeliveryFeeType, DistanceTier } from "./types";

const DeliveryFeesPage = () => {
  const toast = useToast();

  const [formData, setFormData] = useState<FormData>({
    type: "FIXED",
    fixedFee: {
      isFree: true,
      type: "FIXED",
      fixedFee: 0,
    },
    distanceBasedFee: {
      isFree: false,
      type: "DISTANCE_BASED",
      estimatedTime: 0,
      tiers: [
        { maxKm: 3, price: 0, isFree: true, estimatedTime: 20 },
        { maxKm: 6, price: 7.5, isFree: false, estimatedTime: 35 },
        { maxKm: 10, price: 12.0, isFree: false, estimatedTime: 50 },
      ],
    },
  });

  const handleTypeChange = (value: DeliveryFeeType) => {
    setFormData((prev) => ({ ...prev, type: value }));
  };

  const handleFixedFeeChange = (
    field: keyof typeof formData.fixedFee,
    value: boolean | number
  ) => {
    setFormData((prev) => ({
      ...prev,
      fixedFee: { ...prev.fixedFee, [field]: value },
    }));
  };

  const handleDistanceBasedChange = (
    field: keyof typeof formData.distanceBasedFee,
    value: boolean | number
  ) => {
    setFormData((prev) => ({
      ...prev,
      distanceBasedFee: { ...prev.distanceBasedFee, [field]: value },
    }));
  };

  const handleTierChange = (
    index: number,
    field: keyof DistanceTier,
    value: boolean | number
  ) => {
    const newTiers = [...formData.distanceBasedFee.tiers];
    newTiers[index] = { ...newTiers[index], [field]: value };
    setFormData((prev) => ({
      ...prev,
      distanceBasedFee: { ...prev.distanceBasedFee, tiers: newTiers },
    }));
  };

  const addTier = () => {
    const newTiers = [
      ...formData.distanceBasedFee.tiers,
      { maxKm: 0, price: 0, isFree: false, estimatedTime: 0 },
    ];
    setFormData((prev) => ({
      ...prev,
      distanceBasedFee: { ...prev.distanceBasedFee, tiers: newTiers },
    }));
  };

  const removeTier = (index: number) => {
    const newTiers = formData.distanceBasedFee.tiers.filter(
      (_, i) => i !== index
    );
    setFormData((prev) => ({
      ...prev,
      distanceBasedFee: { ...prev.distanceBasedFee, tiers: newTiers },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock save
    toast({
      title: "Configurações salvas",
      description: "As taxas de entrega foram atualizadas com sucesso.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const breadcrumbLinks = [
    { label: "Home", href: "/" },
    { label: "Taxas de Entrega", isCurrent: true },
  ];

  return (
    <Box w="100%" p={6}>
      <Breadcrumb links={breadcrumbLinks} />
      <Stack spacing={8} w="100%">
        <Heading mt={2} size="md">
          Configurações de Taxas de Entrega
        </Heading>

        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <Stack spacing={8} w="100%">
            {/* Tipo de Taxa */}
            <Box
              p={6}
              borderWidth="1px"
              borderRadius="lg"
              boxShadow="sm"
              w="100%"
            >
              <Heading size="md" mb={4}>
                Tipo de Taxa
              </Heading>
              <RadioGroup value={formData.type} onChange={handleTypeChange}>
                <Stack direction="row">
                  <Radio value="FIXED">Taxa Única</Radio>
                  <Radio value="DISTANCE_BASED">Baseada em Distância</Radio>
                </Stack>
              </RadioGroup>
            </Box>

            {/* Taxa Única */}
            {formData.type === "FIXED" && (
              <Box
                p={6}
                borderWidth="1px"
                borderRadius="lg"
                boxShadow="sm"
                w="100%"
              >
                <Heading size="md" mb={4}>
                  Taxa Única
                </Heading>
                <VStack spacing={4} align="stretch">
                  <Checkbox
                    colorScheme="primary"
                    isChecked={formData.fixedFee.isFree}
                    onChange={(e) =>
                      handleFixedFeeChange("isFree", e.target.checked)
                    }
                  >
                    Entrega Grátis
                  </Checkbox>
                  {!formData.fixedFee.isFree && (
                    <FormControl>
                      <InputGroup>
                        <InputLeftAddon>R$</InputLeftAddon>
                        <NumberInput
                          value={formData.fixedFee.fixedFee}
                          onChange={(valueString) =>
                            handleFixedFeeChange(
                              "fixedFee",
                              parseFloat(valueString) || 0
                            )
                          }
                          min={0}
                          precision={2}
                        >
                          <NumberInputField />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                      </InputGroup>
                    </FormControl>
                  )}
                </VStack>
              </Box>
            )}

            {/* Baseada em Distância */}
            {formData.type === "DISTANCE_BASED" && (
              <Box
                p={6}
                borderWidth="1px"
                borderRadius="lg"
                boxShadow="sm"
                w="100%"
              >
                <Heading size="md" mb={4}>
                  Taxa Baseada em Distância
                </Heading>
                <VStack spacing={4} align="stretch">
                  <FormControl>
                    <Text fontWeight="semibold" mb={2}>
                      Tempo Estimado Geral (minutos)
                    </Text>
                    <NumberInput
                      value={formData.distanceBasedFee.estimatedTime}
                      onChange={(valueString) =>
                        handleDistanceBasedChange(
                          "estimatedTime",
                          parseInt(valueString) || 0
                        )
                      }
                      min={0}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>

                  <Text fontWeight="semibold">Faixas de Distância</Text>
                  {formData.distanceBasedFee.tiers.map((tier, index) => (
                    <Box key={index} p={4} borderWidth="1px" borderRadius="md">
                      <HStack spacing={4} align="start">
                        <FormControl>
                          <Text fontSize="sm" mb={1}>
                            Máx. KM
                          </Text>
                          <NumberInput
                            value={tier.maxKm}
                            onChange={(valueString) =>
                              handleTierChange(
                                index,
                                "maxKm",
                                parseFloat(valueString) || 0
                              )
                            }
                            min={0}
                            precision={1}
                          >
                            <NumberInputField />
                            <NumberInputStepper>
                              <NumberIncrementStepper />
                              <NumberDecrementStepper />
                            </NumberInputStepper>
                          </NumberInput>
                        </FormControl>

                        <Checkbox
                          colorScheme="primary"
                          isChecked={tier.isFree}
                          onChange={(e) =>
                            handleTierChange(index, "isFree", e.target.checked)
                          }
                        >
                          Grátis
                        </Checkbox>

                        {!tier.isFree && (
                          <FormControl>
                            <Text fontSize="sm" mb={1}>
                              Preço (R$)
                            </Text>
                            <NumberInput
                              value={tier.price}
                              onChange={(valueString) =>
                                handleTierChange(
                                  index,
                                  "price",
                                  parseFloat(valueString) || 0
                                )
                              }
                              min={0}
                              precision={2}
                            >
                              <NumberInputField />
                              <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                              </NumberInputStepper>
                            </NumberInput>
                          </FormControl>
                        )}

                        <FormControl>
                          <Text fontSize="sm" mb={1}>
                            Tempo Est. (min)
                          </Text>
                          <NumberInput
                            value={tier.estimatedTime}
                            onChange={(valueString) =>
                              handleTierChange(
                                index,
                                "estimatedTime",
                                parseInt(valueString) || 0
                              )
                            }
                            min={0}
                          >
                            <NumberInputField />
                            <NumberInputStepper>
                              <NumberIncrementStepper />
                              <NumberDecrementStepper />
                            </NumberInputStepper>
                          </NumberInput>
                        </FormControl>

                        {formData.distanceBasedFee.tiers.length > 1 && (
                          <IconButton
                            aria-label="Remover faixa"
                            icon={<CloseIcon />}
                            size="sm"
                            colorScheme="red"
                            variant="ghost"
                            onClick={() => removeTier(index)}
                          />
                        )}
                      </HStack>
                    </Box>
                  ))}

                  <Button
                    leftIcon={<AddIcon />}
                    colorScheme="primary"
                    variant="outline"
                    size="sm"
                    onClick={addTier}
                    alignSelf="flex-start"
                  >
                    Adicionar Faixa
                  </Button>
                </VStack>
              </Box>
            )}

            <Button
              type="submit"
              colorScheme="primary"
              size="md"
              w="max-content"
            >
              Salvar
            </Button>
          </Stack>
        </form>
      </Stack>
    </Box>
  );
};

export default DeliveryFeesPage;
