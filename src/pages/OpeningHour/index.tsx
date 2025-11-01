import { useState } from "react";
import {
  Box,
  Heading,
  VStack,
  Stack,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  Switch,
  IconButton,
  Button,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import { TimeIcon, AddIcon, CloseIcon } from "@chakra-ui/icons";
import Breadcrumb from "@/components/Breadcrumb";
import { useAuth, useScheduleFromOpeningHours } from "@/hook/auth";
import { useDispatch } from "react-redux";
import { daysOfWeek } from "@/constants";
import {
  setAlwaysOpenRequest,
  setEditOpeningHoursRequest,
} from "@/store/features/auth/authSlice";

type Errors = Record<string, { open?: string[]; close?: string[] }>;

export default function OpeningHoursPage() {
  const { company, isSubmitEditOpeningHoursForm } = useAuth();
  const dispatch = useDispatch();

  const [schedule, setSchedule] = useScheduleFromOpeningHours(
    company?.openingHours || []
  );

  const [open24h, setOpen24h] = useState(company?.isAlwaysOpening);

  const [errors, setErrors] = useState<Errors>({});

  const handleChange = (
    day: string,
    index: number,
    field: "open" | "close",
    value: string
  ) => {
    setSchedule((prev) => {
      const updated = [...prev[day].hours];
      updated[index][field] = value;
      return {
        ...prev,
        [day]: {
          ...prev[day],
          hours: updated,
        },
      };
    });

    setErrors((prev) => {
      if (!prev[day]) return prev;
      const newFieldErrors = prev[day][field]?.slice() || [];
      newFieldErrors[index] = "";
      return {
        ...prev,
        [day]: {
          ...prev[day],
          [field]: newFieldErrors,
        },
      };
    });
  };

  const toggleDay = (day: string) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        enabled: !prev[day].enabled,
      },
    }));

    setErrors((prev) => {
      if (prev[day]) {
        const newErrors = { ...prev };
        delete newErrors[day];
        return newErrors;
      }
      return prev;
    });
  };

  const addHour = (day: string) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        hours: [...prev[day].hours, { open: "", close: "" }],
      },
    }));
  };

  const removeHour = (day: string, index: number) => {
    setSchedule((prev) => {
      const updated = [...prev[day].hours];
      updated.splice(index, 1);
      return {
        ...prev,
        [day]: {
          ...prev[day],
          hours: updated.length > 0 ? updated : [{ open: "", close: "" }],
        },
      };
    });

    setErrors((prev) => {
      if (!prev[day]) return prev;

      const cleanFieldErrors = (fieldErrors?: string[]) => {
        if (!fieldErrors) return [];
        const newErrors = fieldErrors.slice();
        newErrors.splice(index, 1);
        return newErrors;
      };

      return {
        ...prev,
        [day]: {
          open: cleanFieldErrors(prev[day].open),
          close: cleanFieldErrors(prev[day].close),
        },
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (open24h) {
      setErrors({});
      return;
    }

    let hasErrors = false;
    const newErrors: Errors = {};

    for (const day of daysOfWeek) {
      if (!schedule[day].enabled) continue;

      schedule[day].hours.forEach(({ open, close }, i) => {
        if (open.trim() === "") {
          newErrors[day] = newErrors[day] || { open: [], close: [] };
          newErrors[day].open = newErrors[day].open || [];
          newErrors[day].open[i] = "Horário de Abertura é obrigatório";
          hasErrors = true;
        }
        if (close.trim() === "") {
          newErrors[day] = newErrors[day] || { open: [], close: [] };
          newErrors[day].close = newErrors[day].close || [];
          newErrors[day].close[i] = "Horário de Fechamento é obrigatório";
          hasErrors = true;
        }

        if (open && close) {
          const [openH, openM] = open.split(":").map(Number);
          const [closeH, closeM] = close.split(":").map(Number);

          const openTotal = openH * 60 + openM;
          const closeTotal = closeH * 60 + closeM;

          if (closeTotal <= openTotal) {
            newErrors[day] = newErrors[day] || { open: [], close: [] };
            newErrors[day].close = newErrors[day].close || [];
            newErrors[day].close[i] =
              "Horário de Fechamento deve ser maior que Abertura";
            hasErrors = true;
          }
        }
      });
    }

    setErrors(newErrors);

    if (hasErrors) {
      return;
    }

    dispatch(
      setEditOpeningHoursRequest({
        schedule,
      })
    );
  };

  const handleOpen24h = () => dispatch(setAlwaysOpenRequest());

  const breadcrumbLinks = [
    { label: "Home", href: "/" },
    { label: "Horário de Funcionamento", isCurrent: true },
  ];

  return (
    <form onSubmit={handleSubmit}>
      <Box mx="auto" p={6}>
        <Breadcrumb links={breadcrumbLinks} />

        <Heading size="md" mb={6}>
          Horário de Funcionamento
        </Heading>

        <Stack direction="row" align="center" mb={6}>
          <Text fontWeight="semibold">Aberto 24 horas</Text>
          <Switch
            isChecked={open24h}
            onChange={() => setOpen24h((prev) => !prev)}
            colorScheme="green"
          />
        </Stack>

        {!open24h && (
          <VStack spacing={7} align="stretch">
            {daysOfWeek.map((day) => (
              <Box key={day}>
                <Text fontWeight="semibold" mb={3}>
                  {day}
                </Text>

                <Switch
                  isChecked={schedule[day].enabled}
                  onChange={() => toggleDay(day)}
                  colorScheme="primary"
                  mb={4}
                  isDisabled={open24h}
                />

                <VStack spacing={4} align="stretch">
                  {schedule[day].hours.map((hour, index) => (
                    <Stack
                      key={index}
                      spacing={4}
                      alignItems={["flex-start", "baseline"]}
                      direction={["column", "row"]}
                    >
                      <FormControl
                        isInvalid={!!errors[day]?.open?.[index]}
                        isDisabled={!schedule[day].enabled || open24h}
                      >
                        <InputGroup>
                          <InputLeftElement pointerEvents="none">
                            <TimeIcon color="gray.400" />
                          </InputLeftElement>
                          <Input
                            type="time"
                            placeholder="Opening time"
                            value={hour.open}
                            onChange={(e) =>
                              handleChange(day, index, "open", e.target.value)
                            }
                            isDisabled={!schedule[day].enabled || open24h}
                          />
                        </InputGroup>
                        <FormErrorMessage>
                          {errors[day]?.open?.[index]}
                        </FormErrorMessage>
                      </FormControl>

                      <FormControl
                        isInvalid={!!errors[day]?.close?.[index]}
                        isDisabled={!schedule[day].enabled || open24h}
                      >
                        <InputGroup>
                          <InputLeftElement pointerEvents="none">
                            <TimeIcon color="gray.400" />
                          </InputLeftElement>
                          <Input
                            type="time"
                            placeholder="Closing time"
                            colorScheme="primary"
                            focusBorderColor="primary.500"
                            value={hour.close}
                            onChange={(e) =>
                              handleChange(day, index, "close", e.target.value)
                            }
                            isDisabled={!schedule[day].enabled || open24h}
                          />
                        </InputGroup>
                        <FormErrorMessage>
                          {errors[day]?.close?.[index]}
                        </FormErrorMessage>
                      </FormControl>

                      {schedule[day].hours.length > 1 && (
                        <IconButton
                          aria-label="Remove hour"
                          icon={<CloseIcon />}
                          size="sm"
                          variant="ghost"
                          colorScheme="red"
                          onClick={() => removeHour(day, index)}
                          isDisabled={!schedule[day].enabled || open24h}
                        />
                      )}
                    </Stack>
                  ))}

                  <IconButton
                    aria-label="Add hour"
                    icon={<AddIcon />}
                    size="sm"
                    variant="outline"
                    colorScheme="primary"
                    alignSelf="flex-start"
                    onClick={() => addHour(day)}
                    isDisabled={!schedule[day].enabled || open24h}
                  />
                </VStack>
              </Box>
            ))}

            <Button
              type="submit"
              colorScheme="primary"
              w="max-content"
              mt={2}
              isDisabled={isSubmitEditOpeningHoursForm}
              isLoading={isSubmitEditOpeningHoursForm}
            >
              Salvar
            </Button>
          </VStack>
        )}

        {open24h && (
          <Button
            type="submit"
            colorScheme="primary"
            w="max-content"
            mt={2}
            onClick={handleOpen24h}
          >
            Salvar
          </Button>
        )}
      </Box>
    </form>
  );
}
