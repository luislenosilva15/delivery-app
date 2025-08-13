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
  FormErrorMessage,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import type { FormData, Props } from "./types";
import { daysOfWeek, groupStepsModal } from "@/constants";

export default function NewGroupModal({ isOpen, onClose, onSubmit }: Props) {
  const [errors, setErrors] = useState<{ name?: string }>({});
  const [scheduleErrors, setScheduleErrors] = useState("");

  const [formData, setFormData] = useState<FormData>({
    name: "",
    alwaysAvailable: true,
    schedule: {},
    daysOff: [],
  });

  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: groupStepsModal.length,
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
    field: "start" | "end",
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
      name: "",
      alwaysAvailable: true,
      schedule: {},
      daysOff: [],
    });
    setActiveStep(0);
    setErrors({});
    setScheduleErrors("");
    onClose();
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
          "Grupo não pode estar indisponível em todos os dias."
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
            setScheduleErrors("Informe ao menos um intervalo válido");
            return false;
          }
        }
      }
    }

    return true;
  };

  const handleNextStep = () => {
    if (activeStep === 0) {
      const newErrors: { name?: string } = {};
      if (!formData.name.trim()) {
        newErrors.name = "O nome do grupo é obrigatório.";
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

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleOnCloseModal}
      size="xl"
      scrollBehavior="inside"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Novo Grupo</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stepper index={activeStep} size="sm" mb={6} colorScheme="primary">
            {groupStepsModal.map((step, index) => (
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
              <FormControl isRequired isInvalid={!!errors.name}>
                <FormLabel>Nome do Grupo</FormLabel>
                <Input
                  focusBorderColor="primary.500"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Digite o nome do grupo"
                />
                {errors.name && (
                  <FormErrorMessage>{errors.name}</FormErrorMessage>
                )}
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
                Sempre disponível
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
                                  aria-label="Remover"
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
          {activeStep < groupStepsModal.length - 1 ? (
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
