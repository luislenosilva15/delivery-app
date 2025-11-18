import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  Heading,
  InputGroup,
  InputLeftAddon,
  Input,
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
  IconButton,
  Grid,
  Switch,
  Flex,
  Badge,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { AddIcon, CloseIcon } from "@chakra-ui/icons";
import Breadcrumb from "@/components/Breadcrumb";
import type { FormData, DeliveryFeeType, DistanceTier } from "./types";
import { useAuth } from "@/hook/auth";
import { useDispatch } from "react-redux";
import { setUpdateDeliveryFeeRequest } from "@/store/features/auth/authSlice";

const DeliveryFeesPage = () => {
  const dispatch = useDispatch();
  const { company, isSubmitDeliveryFeeForm } = useAuth();

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
      tiers: [
        { maxKm: 3, price: 0, isFree: true, estimatedTime: 20 },
        { maxKm: 6, price: 7.5, isFree: false, estimatedTime: 35 },
        { maxKm: 10, price: 12.0, isFree: false, estimatedTime: 50 },
      ],
    },
  });

  useEffect(() => {
    const df = company?.deliveryFee;
    if (!df) return;

    if (df.type === "FIXED") {
      setFormData({
        type: "FIXED",
        fixedFee: {
          isFree: df.isFree,
          type: "FIXED",
          fixedFee: df.fixedFee || 0,
        },
        distanceBasedFee: { isFree: false, type: "DISTANCE_BASED", tiers: [] },
      });
    } else {
      setFormData({
        type: "DISTANCE_BASED",
        fixedFee: { isFree: false, type: "FIXED", fixedFee: 0 },
        distanceBasedFee: {
          isFree: df.isFree ?? false,
          type: "DISTANCE_BASED",
          tiers: (df.tiers || []).map((t) => ({
            maxKm: t.maxKm,
            price: t.price,
            isFree: Boolean(t.isFree),
            estimatedTime: t.estimatedTime ?? 0,
          })),
        },
      });
    }
  }, [company?.deliveryFee]);

  const [invalidFixedFee, setInvalidFixedFee] = useState(false);
  const [invalidTierKm, setInvalidTierKm] = useState<Set<number>>(new Set());
  const [invalidTierPrice, setInvalidTierPrice] = useState<Set<number>>(
    new Set()
  );

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

  const validateForm = (): boolean => {
    const errors: string[] = [];
    setInvalidFixedFee(false);
    const tierKm = new Set<number>();
    const tierPrice = new Set<number>();

    if (formData.type === "FIXED") {
      if (!formData.fixedFee.isFree && formData.fixedFee.fixedFee <= 0) {
        errors.push(
          "Informe um valor maior que zero ou marque a opção 'Entrega grátis'."
        );
        setInvalidFixedFee(true);
      }
    } else if (formData.type === "DISTANCE_BASED") {
      const tiers = formData.distanceBasedFee.tiers;
      if (tiers.length === 0) {
        errors.push("Adicione pelo menos uma taxa de distância.");
      } else {
        tiers.forEach((t, i) => {
          if (t.maxKm <= 0) {
            errors.push(
              `Na taxa #${i + 1}, o Km máximo precisa ser maior que zero.`
            );
            tierKm.add(i);
          }
          if (!t.isFree && t.price <= 0) {
            errors.push(
              `Na taxa #${
                i + 1
              }, informe um preço maior que zero ou marque como grátis.`
            );
            tierPrice.add(i);
          }
        });
      }
    }

    setInvalidTierKm(tierKm);
    setInvalidTierPrice(tierPrice);

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (formData.type === "FIXED") {
      dispatch(
        setUpdateDeliveryFeeRequest({
          isFree: formData.fixedFee.isFree,
          type: "FIXED",
          fixedFee: formData.fixedFee.fixedFee,
        })
      );
    } else {
      dispatch(
        setUpdateDeliveryFeeRequest({
          isFree: false,
          type: "DISTANCE_BASED",
          estimatedTime: 0,
          tiers: formData.distanceBasedFee.tiers.map((t) => ({
            maxKm: t.maxKm,
            price: t.price,
            isFree: t.isFree,
            estimatedTime: t.estimatedTime,
          })),
        })
      );
    }
  };

  const breadcrumbLinks = [
    { label: "Home", href: "/" },
    { label: "Taxas de Entrega", isCurrent: true },
  ];

  const freeBgLight = "green.50";
  const freeBgDark = "rgba(56,161,105,0.12)";
  const tierCardBg = useColorModeValue("white", "gray.800");
  const addCardHover = useColorModeValue("primary.50", "whiteAlpha.50");
  const addCardBorder = useColorModeValue("primary.300", "primary.200");
  const disabledPriceBg = useColorModeValue("gray.50", "whiteAlpha.100");
  const removeIconHoverBg = useColorModeValue("red.100", "red.700");
  const removeIconActiveBg = useColorModeValue("red.200", "red.600");

  const formatBRL = (value: number) => {
    return value.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const canSubmit = useMemo(() => {
    if (formData.type === "FIXED") {
      return formData.fixedFee.isFree || formData.fixedFee.fixedFee > 0;
    }
    const tiers = formData.distanceBasedFee.tiers;
    if (!tiers || tiers.length === 0) return false;
    return tiers.every((t) => t.maxKm > 0 && (t.isFree || t.price > 0));
  }, [formData]);

  return (
    <Box w="100%" p={6}>
      <Breadcrumb links={breadcrumbLinks} />
      <Stack spacing={8} w="100%">
        <Heading mt={2} size="md">
          Configurações de Taxas de Entrega
        </Heading>

        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <Stack spacing={8} w="100%">
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
                    <FormControl isInvalid={invalidFixedFee}>
                      <Text fontSize="xs" mb={1} fontWeight="semibold">
                        Valor da taxa
                      </Text>
                      <InputGroup>
                        <InputLeftAddon>R$</InputLeftAddon>
                        <Input
                          value={formatBRL(formData.fixedFee.fixedFee)}
                          inputMode="numeric"
                          onChange={(e) => {
                            const rawDigits = e.target.value.replace(/\D/g, "");
                            const numeric =
                              parseInt(rawDigits || "0", 10) / 100;
                            handleFixedFeeChange("fixedFee", numeric);
                          }}
                        />
                      </InputGroup>
                      {invalidFixedFee && (
                        <FormErrorMessage>
                          Informe um valor maior que zero ou marque a opção de
                          entrega grátis.
                        </FormErrorMessage>
                      )}
                    </FormControl>
                  )}
                </VStack>
              </Box>
            )}

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
                  <Text fontWeight="semibold">Taxas de Distância</Text>
                  {formData.distanceBasedFee.tiers.length === 0 && (
                    <Text fontSize="sm" color="gray.500">
                      Nenhuma taxa cadastrada. Adicione a primeira.
                    </Text>
                  )}
                  {formData.distanceBasedFee.tiers.map((tier, index) => {
                    const isFree = tier.isFree;
                    return (
                      <Box
                        key={index}
                        p={4}
                        borderWidth="1px"
                        borderRadius="lg"
                        position="relative"
                        bg={isFree ? freeBgLight : tierCardBg}
                        _dark={{ bg: isFree ? freeBgDark : tierCardBg }}
                        _hover={{ boxShadow: "md" }}
                        transition="box-shadow 0.15s ease"
                      >
                        <IconButton
                          aria-label="Remover taxa"
                          icon={<CloseIcon boxSize={3} />}
                          size="md"
                          colorScheme="red"
                          variant="ghost"
                          position="absolute"
                          top={2}
                          right={2}
                          onClick={() => removeTier(index)}
                          zIndex={10}
                          borderRadius="full"
                          minW="32px"
                          h="32px"
                          _hover={{
                            bg: removeIconHoverBg,
                          }}
                          _active={{
                            bg: removeIconActiveBg,
                          }}
                          _focusVisible={{
                            boxShadow: "0 0 0 3px rgba(229,62,62,0.4)",
                          }}
                        />
                        <Grid
                          templateColumns={{
                            base: "repeat(2,1fr)",
                            md: "140px 1fr 90px 140px",
                          }}
                          gap={4}
                          alignItems="start"
                        >
                          {/* Máx. KM */}
                          <FormControl isInvalid={invalidTierKm.has(index)}>
                            <Text fontSize="xs" mb={1} fontWeight="semibold">
                              Km. Máximo
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
                            {invalidTierKm.has(index) && (
                              <FormErrorMessage>
                                Digite um valor de Km máximo maior que zero.
                              </FormErrorMessage>
                            )}
                          </FormControl>
                          {/* Preço (R$) com máscara BRL */}
                          <FormControl isInvalid={invalidTierPrice.has(index)}>
                            <Text fontSize="xs" mb={1} fontWeight="semibold">
                              Preço (R$)
                            </Text>
                            <InputGroup>
                              <InputLeftAddon>R$</InputLeftAddon>
                              <Input
                                isDisabled={isFree}
                                bg={isFree ? disabledPriceBg : undefined}
                                value={formatBRL(tier.price)}
                                inputMode="numeric"
                                onChange={(e) => {
                                  const rawDigits = e.target.value.replace(
                                    /\D/g,
                                    ""
                                  );
                                  const numeric =
                                    parseInt(rawDigits || "0", 10) / 100;
                                  handleTierChange(index, "price", numeric);
                                }}
                              />
                            </InputGroup>
                            {invalidTierPrice.has(index) && !isFree && (
                              <FormErrorMessage>
                                Informe um preço maior que zero ou marque como
                                grátis.
                              </FormErrorMessage>
                            )}
                          </FormControl>
                          <Flex
                            direction="column"
                            justify="center"
                            align="flex-start"
                            pb={1}
                          >
                            <Text fontSize="xs" fontWeight="semibold" mb={1}>
                              Grátis
                            </Text>
                            <Switch
                              size="sm"
                              colorScheme="green"
                              isChecked={isFree}
                              onChange={(e) =>
                                handleTierChange(
                                  index,
                                  "isFree",
                                  e.target.checked
                                )
                              }
                            />
                            {isFree && (
                              <Badge
                                mt={2}
                                colorScheme="green"
                                variant="solid"
                                fontSize="0.55rem"
                              >
                                Entrega grátis
                              </Badge>
                            )}
                          </Flex>
                          <FormControl>
                            <Text fontSize="xs" mb={1} fontWeight="semibold">
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
                        </Grid>
                      </Box>
                    );
                  })}

                  {/* Add tier card */}
                  <Tooltip label="Adicionar nova taxa de distância" hasArrow>
                    <Flex
                      onClick={addTier}
                      cursor="pointer"
                      border="2px dashed"
                      borderColor={addCardBorder}
                      p={4}
                      borderRadius="lg"
                      align="center"
                      justify="center"
                      gap={2}
                      _hover={{ bg: addCardHover }}
                      transition="background 0.15s ease"
                      w="100%"
                    >
                      <AddIcon boxSize={3} />
                      <Text fontSize="sm" fontWeight="semibold">
                        Adicionar nova taxa
                      </Text>
                    </Flex>
                  </Tooltip>
                </VStack>
              </Box>
            )}

            <Button
              type="submit"
              colorScheme="primary"
              size="md"
              w="max-content"
              isLoading={isSubmitDeliveryFeeForm}
              isDisabled={!canSubmit || isSubmitDeliveryFeeForm}
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
