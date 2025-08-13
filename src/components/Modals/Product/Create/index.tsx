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
  FormControl,
  FormLabel,
  Input,
  HStack,
  VStack,
  IconButton,
  Checkbox,
  Text,
  useSteps,
  Stepper,
  Step,
  StepIndicator,
  StepStatus,
  StepIcon,
  StepNumber,
  StepTitle,
  StepDescription,
  StepSeparator,
  Textarea,
  Radio,
  RadioGroup,
  Stack,
  FormErrorMessage,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import ImageUploader from "@/components/ImageUploader";
import type { FormData, Props } from "./types";
import type { TProductAvailabilityBy } from "@/store/features/menu/types/models";
import { daysOfWeek, productStepsModal } from "@/constants";

export default function ProductModal({ isOpen, onClose, onSubmit }: Props) {
  const [errors, setErrors] = useState<{ name?: string; price?: string }>({});
  const [scheduleErrors, setScheduleErrors] = useState<string>("");

  const [formData, setFormData] = useState<FormData>({
    imageFile: null as File | null,
    image: null as string | null,
    name: "",
    description: "",
    price: 0,
    availability: "BOTH",
    alwaysAvailable: true,
    schedule: {},
    daysOff: [],
  });

  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: productStepsModal.length,
  });

  const addInterval = (day: string) => {
    setFormData((prev) => ({
      ...prev,
      schedule: {
        ...prev.schedule,
        [day]: [...(prev.schedule[day] || []), { start: "", end: "" }],
      },
    }));
  };

  const removeInterval = (day: string, index: number) => {
    setFormData((prev) => ({
      ...prev,
      schedule: {
        ...prev.schedule,
        [day]: prev.schedule[day]?.filter((_, i) => i !== index) || [],
      },
    }));
  };

  const updateSchedule = (
    day: string,
    index: number,
    field: keyof FormData["schedule"][string][number],
    value: string
  ) => {
    setFormData((prev) => {
      const updated = [...(prev.schedule[day] || [])];
      updated[index][field] = value;
      return {
        ...prev,
        schedule: {
          ...prev.schedule,
          [day]: updated,
        },
      };
    });
  };

  const handleOnCloseModal = () => {
    setFormData({
      imageFile: null as File | null,
      image: null as string | null,
      name: "",
      description: "",
      price: 0,
      availability: "BOTH",
      alwaysAvailable: true,
      schedule: {},
      daysOff: [],
    });
    setActiveStep(0);
    onClose();
    setErrors({});
    setScheduleErrors("");
  };

  const toggleDayOff = (day: string) => {
    setFormData((prev) => {
      const isOff = prev.daysOff.includes(day);
      const newDaysOff = isOff
        ? prev.daysOff.filter((d) => d !== day)
        : [...prev.daysOff, day];
      const newSchedule = isOff
        ? prev.schedule
        : { ...prev.schedule, [day]: [] };

      return {
        ...prev,
        daysOff: newDaysOff,
        schedule: newSchedule,
      };
    });
  };

  const handleAlwaysAvailableChange = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      alwaysAvailable: checked,
      daysOff: checked ? [] : [...daysOfWeek],
      schedule: {},
    }));
  };

  const validateSchedule = (): boolean => {
    setScheduleErrors("");

    if (!formData.alwaysAvailable) {
      if (formData.daysOff.length === daysOfWeek.length) {
        setScheduleErrors(
          "Produto não pode estar indisponível em todos os dias."
        );
        return false;
      }

      for (const day of daysOfWeek) {
        if (!formData.daysOff.includes(day)) {
          const intervals = formData.schedule[day] || [];
          if (
            intervals.length === 0 ||
            intervals.some(
              (interval) =>
                !interval.start.trim() ||
                !interval.end.trim() ||
                interval.start >= interval.end
            )
          ) {
            setScheduleErrors(`informe ao menos um intervalo válido`);
            return false;
          }
        }
      }
    }

    setScheduleErrors("");
    return true;
  };

  const handleNextStep = () => {
    if (activeStep === 0) {
      const newErrors: { name?: string; price?: string } = {};

      if (!formData.name.trim()) {
        newErrors.name = "O nome do produto é obrigatório.";
      }
      if (formData.price <= 0 || isNaN(formData.price)) {
        newErrors.price = "Informe um preço válido.";
      }

      setErrors(newErrors);

      if (Object.keys(newErrors).length > 0) return;
    }

    if (activeStep === 1) {
      const isValid = validateSchedule();
      if (!isValid) return;
    }

    setErrors({});
    setScheduleErrors("");
    setActiveStep(activeStep + 1);
  };

  const save = () => {
    const isValid = validateSchedule();
    if (!isValid) return;

    handleOnCloseModal();
    onSubmit(formData);
  };

  const formatToBRL = (value: number) =>
    value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, "");
    const numericValue = rawValue ? Number(rawValue) / 100 : 0;
    setFormData({ ...formData, price: numericValue });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleOnCloseModal}
      size="xl"
      scrollBehavior="inside"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Novo Produto</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stepper index={activeStep} size="sm" mb={6} colorScheme="primary">
            {productStepsModal.map((step, index) => (
              <Step
                key={index}
                onClick={() => setActiveStep(index)}
                cursor="pointer"
              >
                <StepIndicator>
                  <StepStatus
                    complete={<StepIcon color="primary.500" />}
                    incomplete={<StepNumber />}
                    active={<StepNumber color="primary.500" />}
                  />
                </StepIndicator>
                <div>
                  <StepTitle
                    style={{ color: "var(--chakra-colors-primary-500)" }}
                  >
                    {step.title}
                  </StepTitle>
                  <StepDescription>{step.description}</StepDescription>
                </div>
                <StepSeparator />
              </Step>
            ))}
          </Stepper>

          {activeStep === 0 && (
            <VStack spacing={4} align="stretch">
              <ImageUploader
                previewUrl={formData?.image as string}
                shape="square"
                onChange={(file: File | null) => {
                  setFormData((prev) => ({
                    ...prev,
                    imageFile: file,
                  }));
                }}
              />

              <FormControl isRequired isInvalid={!!errors.name}>
                <FormLabel>Nome</FormLabel>
                <Input
                  focusBorderColor="primary.500"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Digite o nome do produto"
                />
                {errors.name && (
                  <FormErrorMessage>{errors.name}</FormErrorMessage>
                )}
              </FormControl>

              <FormControl isRequired isInvalid={!!errors.price}>
                <FormLabel>Preço</FormLabel>
                <Input
                  focusBorderColor="primary.500"
                  type="text"
                  value={formData.price > 0 ? formatToBRL(formData.price) : ""}
                  onChange={handlePriceChange}
                  placeholder="Digite o preço do produto"
                />
                {errors.price && (
                  <FormErrorMessage>{errors.price}</FormErrorMessage>
                )}
              </FormControl>

              <FormControl>
                <FormLabel>Descrição</FormLabel>
                <Textarea
                  focusBorderColor="primary.500"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Digite a descrição do produto"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Disponibilidade</FormLabel>
                <RadioGroup
                  onChange={(value: TProductAvailabilityBy) => {
                    setFormData({
                      ...formData,
                      availability: value,
                    });
                  }}
                  value={formData.availability}
                  colorScheme="primary"
                >
                  <Stack direction="row" spacing={4} mb={4}>
                    <Radio value="DELIVERY">Delivery</Radio>
                    <Radio value="LOCAL">Retirada</Radio>
                    <Radio value="BOTH">Ambos</Radio>
                  </Stack>
                </RadioGroup>
              </FormControl>
            </VStack>
          )}

          {activeStep === 1 && (
            <VStack spacing={4} align="stretch">
              <Checkbox
                isChecked={formData.alwaysAvailable}
                onChange={(e) => handleAlwaysAvailableChange(e.target.checked)}
                colorScheme="primary"
              >
                Disponibilidade de acordo com grupo
              </Checkbox>

              {!formData.alwaysAvailable && (
                <>
                  {scheduleErrors && (
                    <Text color="red.500" fontSize="sm" mt={2}>
                      {scheduleErrors}
                    </Text>
                  )}

                  {daysOfWeek.map((day) => (
                    <VStack
                      key={day}
                      align="stretch"
                      border="1px solid"
                      borderColor="gray.600"
                      p={3}
                      borderRadius="md"
                    >
                      <HStack justify="space-between">
                        <Text fontWeight="medium">{day}</Text>
                        <Checkbox
                          isChecked={formData.daysOff.includes(day)}
                          onChange={() => toggleDayOff(day)}
                          colorScheme="primary"
                        >
                          Dia sem disponibilidade
                        </Checkbox>
                      </HStack>

                      {!formData.daysOff.includes(day) && (
                        <>
                          {(formData.schedule[day] || []).map(
                            (interval, index) => (
                              <HStack key={index}>
                                <Input
                                  focusBorderColor="primary.500"
                                  type="time"
                                  value={interval.start}
                                  onChange={(e) =>
                                    updateSchedule(
                                      day,
                                      index,
                                      "start",
                                      e.target.value
                                    )
                                  }
                                />
                                <Input
                                  focusBorderColor="primary.500"
                                  type="time"
                                  value={interval.end}
                                  onChange={(e) =>
                                    updateSchedule(
                                      day,
                                      index,
                                      "end",
                                      e.target.value
                                    )
                                  }
                                />
                                <IconButton
                                  aria-label="Remove"
                                  icon={<DeleteIcon />}
                                  size="sm"
                                  onClick={() => removeInterval(day, index)}
                                />
                              </HStack>
                            )
                          )}
                          <Button
                            size="sm"
                            leftIcon={<AddIcon />}
                            onClick={() => addInterval(day)}
                          >
                            Adicionar intervalo
                          </Button>
                        </>
                      )}
                    </VStack>
                  ))}
                </>
              )}
            </VStack>
          )}
        </ModalBody>

        <ModalFooter>
          {activeStep > 0 && (
            <Button
              variant="ghost"
              mr={3}
              onClick={() => setActiveStep(activeStep - 1)}
              colorScheme="primary"
            >
              Voltar
            </Button>
          )}
          {activeStep < productStepsModal.length - 1 ? (
            <Button colorScheme="primary" onClick={handleNextStep}>
              Próximo
            </Button>
          ) : (
            <Button colorScheme="primary" onClick={save}>
              Salvar
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
