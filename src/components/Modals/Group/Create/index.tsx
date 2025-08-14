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
  VStack,
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
import type { FormData, Props } from "./types";
import { daysOfWeek, groupStepsModal } from "@/constants";
import ScheduleForm from "@/components/Shedule";

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
            <ScheduleForm
              alwaysAvailable={formData.alwaysAvailable}
              daysOff={formData.daysOff}
              schedule={formData.schedule}
              errors={scheduleErrors}
              onChange={({ alwaysAvailable, daysOff, schedule }) =>
                setFormData((prev) => ({
                  ...prev,
                  alwaysAvailable,
                  daysOff,
                  schedule,
                }))
              }
            />
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
