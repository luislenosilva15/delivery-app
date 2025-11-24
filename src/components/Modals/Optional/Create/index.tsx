import { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  RadioGroup,
  Radio,
  Stack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Checkbox,
  HStack,
  IconButton,
  FormErrorMessage,
} from "@chakra-ui/react";
import { maskMoney } from "@/utils/mask";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import type { OptionalOption, Props } from "./types";

export default function OptionalModal({ isOpen, onClose, onSubmit }: Props) {
  const [type, setType] = useState<"simple" | "options">("simple");
  const [simpleData, setSimpleData] = useState({
    name: "",
    price: 0,
    code: "",
  });
  const [optionsData, setOptionsData] = useState({
    name: "",
    min: 0,
    max: 1,
    canRepeat: false,
    options: [] as OptionalOption[],
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (!isOpen) {
      setType("simple");
      setSimpleData({ name: "", price: 0, code: "" });
      setOptionsData({
        name: "",
        min: 0,
        max: 1,
        canRepeat: false,
        options: [],
      });
      setErrors({});
    }
  }, [isOpen]);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (type === "simple") {
      if (!simpleData.name.trim()) newErrors.name = "Nome é obrigatório";
      if (simpleData.price < 0) newErrors.price = "Preço deve ser positivo";
    } else {
      if (!optionsData.name.trim()) newErrors.groupName = "Nome é obrigatório";
      if (optionsData.min < 0) newErrors.min = "Mínimo deve ser positivo";
      if (optionsData.max < optionsData.min)
        newErrors.max = "Máximo deve ser maior ou igual ao mínimo";
      if (optionsData.options.length === 0)
        newErrors.options = "Adicione pelo menos uma opção";
      optionsData.options.forEach((opt, index) => {
        if (!opt.name.trim())
          newErrors[`optionName${index}`] = "Nome da opção é obrigatório";
        if (opt.price < 0)
          newErrors[`optionPrice${index}`] = "Preço deve ser positivo";
      });
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    if (type === "simple") {
      onSubmit({ ...simpleData, type: "simple" });
    } else {
      onSubmit({ ...optionsData, type: "options" });
    }
    onClose();
  };

  const addOption = () => {
    setOptionsData((prev) => ({
      ...prev,
      options: [...prev.options, { name: "", price: 0, code: "" }],
    }));
  };

  const removeOption = (index: number) => {
    setOptionsData((prev) => ({
      ...prev,
      options: prev.options.filter((_, i) => i !== index),
    }));
  };

  const updateOption = (
    index: number,
    field: keyof OptionalOption,
    value: string | number
  ) => {
    setOptionsData((prev) => ({
      ...prev,
      options: prev.options.map((opt, i) =>
        i === index ? { ...opt, [field]: value } : opt
      ),
    }));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Criar Opcional</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={6} align="stretch">
            <FormControl>
              <FormLabel>Tipo de Opcional</FormLabel>
              <RadioGroup
                value={type}
                onChange={(value: "simple" | "options") => setType(value)}
              >
                <Stack direction="row">
                  <Radio value="simple">Simples</Radio>
                  <Radio value="options">Opções</Radio>
                </Stack>
              </RadioGroup>
            </FormControl>

            {type === "simple" ? (
              <VStack spacing={4} align="stretch">
                <FormControl isInvalid={!!errors.name}>
                  <FormLabel>Nome</FormLabel>
                  <Input
                    value={simpleData.name}
                    onChange={(e) =>
                      setSimpleData((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    placeholder="Ex: Queijo"
                  />
                  <FormErrorMessage>{errors.name}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.price}>
                  <FormLabel>Preço Adicional</FormLabel>
                  <Input
                    value={
                      simpleData.price
                        ? maskMoney(simpleData.price.toString())
                        : ""
                    }
                    onChange={(e) => {
                      const numeric = e.target.value.replace(/\D/g, "");
                      const value = parseFloat(numeric) / 100;
                      setSimpleData((prev) => ({ ...prev, price: value || 0 }));
                    }}
                    placeholder="R$ 0,00"
                  />
                  <FormErrorMessage>{errors.price}</FormErrorMessage>
                </FormControl>
                <FormControl>
                  <FormLabel>Código (opcional)</FormLabel>
                  <Input
                    value={simpleData.code}
                    onChange={(e) =>
                      setSimpleData((prev) => ({
                        ...prev,
                        code: e.target.value,
                      }))
                    }
                    placeholder="Cód. opcional"
                  />
                </FormControl>
              </VStack>
            ) : (
              <VStack spacing={4} align="stretch">
                <FormControl isInvalid={!!errors.groupName}>
                  <FormLabel>Nome</FormLabel>
                  <Input
                    value={optionsData.name}
                    onChange={(e) =>
                      setOptionsData((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    placeholder="Ex: Temperos"
                  />
                  <FormErrorMessage>{errors.groupName}</FormErrorMessage>
                </FormControl>
                <HStack spacing={4}>
                  <FormControl isInvalid={!!errors.min}>
                    <FormLabel>Mínimo</FormLabel>
                    <NumberInput
                      value={optionsData.min}
                      onChange={(_, value) =>
                        setOptionsData((prev) => ({ ...prev, min: value }))
                      }
                      min={0}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                    <FormErrorMessage>{errors.min}</FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={!!errors.max}>
                    <FormLabel>Máximo</FormLabel>
                    <NumberInput
                      value={optionsData.max}
                      onChange={(_, value) =>
                        setOptionsData((prev) => ({ ...prev, max: value }))
                      }
                      min={0}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                    <FormErrorMessage>{errors.max}</FormErrorMessage>
                  </FormControl>
                </HStack>
                <FormControl>
                  <Checkbox
                    isChecked={optionsData.canRepeat}
                    onChange={(e) =>
                      setOptionsData((prev) => ({
                        ...prev,
                        canRepeat: e.target.checked,
                      }))
                    }
                  >
                    Pode repetir opções
                  </Checkbox>
                </FormControl>
                <FormControl isInvalid={!!errors.options}>
                  <FormLabel>Opções</FormLabel>
                  <VStack spacing={2} align="stretch">
                    {optionsData.options.map((option, index) => (
                      <HStack key={index} spacing={2}>
                        <Input
                          placeholder="Nome da opção"
                          value={option.name}
                          onChange={(e) =>
                            updateOption(index, "name", e.target.value)
                          }
                          isInvalid={!!errors[`optionName${index}`]}
                        />
                        <Input
                          placeholder="R$ 0,00"
                          value={
                            option.price
                              ? maskMoney(option.price.toString())
                              : ""
                          }
                          onChange={(e) => {
                            const numeric = e.target.value.replace(/\D/g, "");
                            const value = parseFloat(numeric) / 100;
                            updateOption(index, "price", value || 0);
                          }}
                          w="120px"
                          isInvalid={!!errors[`optionPrice${index}`]}
                        />
                        <Input
                          placeholder="Cód."
                          value={option.code}
                          onChange={(e) =>
                            updateOption(index, "code", e.target.value)
                          }
                          w="100px"
                        />
                        <IconButton
                          aria-label="Remover opção"
                          icon={<DeleteIcon />}
                          onClick={() => removeOption(index)}
                          colorScheme="red"
                          size="sm"
                        />
                      </HStack>
                    ))}
                    <Button
                      leftIcon={<AddIcon />}
                      onClick={addOption}
                      size="sm"
                      alignSelf="flex-start"
                    >
                      Adicionar Opção
                    </Button>
                  </VStack>
                  <FormErrorMessage>{errors.options}</FormErrorMessage>
                </FormControl>
              </VStack>
            )}
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancelar
          </Button>
          <Button colorScheme="primary" onClick={handleSubmit}>
            Criar Opcional
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
