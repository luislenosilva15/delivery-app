import { Spinner, Center, Checkbox } from "@chakra-ui/react";
import { useEffect, useState } from "react";
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
  Textarea,
  FormErrorMessage,
} from "@chakra-ui/react";
import ImageUploader from "@/components/ImageUploader";
import type { FormData, Props } from "./types";
import { daysOfWeek, productStepsModal } from "@/constants";
import { fetchCurrentProductRequest } from "@/store/features/menu/menuSlice";
import { useDispatch } from "react-redux";
import { useMenu } from "@/hook/menu";
import { formatToBRL } from "@/utils/validations";
import { formDataProductEditData } from "@/store/features/menu/normalize";
import ScheduleForm from "@/components/Shedule";

export default function ProductModal({
  isOpen,
  onClose,
  onSubmit,
  productId,
}: Props) {
  const [errors, setErrors] = useState<{ name?: string; price?: string }>({});
  const [scheduleErrors, setScheduleErrors] = useState<string>("");

  const { loadingCurrentProduct, currentProduct } = useMenu();

  const dispatch = useDispatch();

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
    isAdultOnly: false,
    code: "",
  });

  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: productStepsModal.length,
  });

  const handleOnCloseModal = () => {
    setFormData({
      imageFile: null,
      image: null,
      name: "",
      description: "",
      price: 0,
      availability: "BOTH",
      alwaysAvailable: true,
      schedule: {},
      daysOff: [],
      isAdultOnly: false,
      code: "",
    });
    setActiveStep(0);
    onClose();
    setErrors({});
    setScheduleErrors("");
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
            setScheduleErrors(`Informe ao menos um intervalo válido`);
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

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, "");
    const numericValue = rawValue ? Number(rawValue) / 100 : 0;
    setFormData({ ...formData, price: numericValue });
  };

  useEffect(() => {
    if (productId && isOpen) {
      dispatch(fetchCurrentProductRequest({ productId }));
    }
  }, [productId, isOpen]);

  useEffect(() => {
    if (currentProduct && isOpen && productId) {
      setFormData(formDataProductEditData(currentProduct));
    }
  }, [currentProduct, isOpen, productId]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleOnCloseModal}
      size="xl"
      scrollBehavior="inside"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {productId ? "Editar Produto" : "Novo Produto"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {loadingCurrentProduct ? (
            <Center py={10}>
              <Spinner size="xl" color="primary.500" />
            </Center>
          ) : (
            <>
              <Stepper
                index={activeStep}
                size="sm"
                mb={6}
                colorScheme="primary"
              >
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
                    previewUrl={formData.image as string}
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
                      value={
                        formData.price > 0 ? formatToBRL(formData.price) : ""
                      }
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
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      placeholder="Digite a descrição do produto"
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Código do produto</FormLabel>
                    <Input
                      focusBorderColor="primary.500"
                      value={formData.code}
                      onChange={(e) =>
                        setFormData({ ...formData, code: e.target.value })
                      }
                      placeholder="Digite o código do produto"
                    />
                  </FormControl>

                  <FormControl>
                    <Checkbox
                      isChecked={formData.isAdultOnly}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          isAdultOnly: e.target.checked,
                        })
                      }
                      colorScheme="primary"
                    >
                      Produto para adultos
                    </Checkbox>
                  </FormControl>
                </VStack>
              )}

              {activeStep === 1 && (
                <ScheduleForm
                  alwaysAvailable={formData.alwaysAvailable}
                  daysOff={formData.daysOff}
                  schedule={formData.schedule}
                  errors={scheduleErrors}
                  avaliableText="Disponibilidade de acordo com grupo"
                  onChange={({ alwaysAvailable, daysOff, schedule }) => {
                    setFormData((prev) => ({
                      ...prev,
                      alwaysAvailable,
                      daysOff,
                      schedule,
                    }));
                  }}
                />
              )}
            </>
          )}
        </ModalBody>

        <ModalFooter>
          {!loadingCurrentProduct && (
            <>
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
            </>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
