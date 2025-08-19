import {
  VStack,
  Checkbox,
  Text,
  HStack,
  Input,
  Button,
  IconButton,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import { daysOfWeek } from "@/constants";
import { useState } from "react";
import type { Props } from "./types";

export default function ScheduleForm({
  alwaysAvailable,
  daysOff,
  schedule,
  onChange,
  errors,
  avaliableText,
}: Props) {
  const [localSchedule, setLocalSchedule] = useState(schedule);
  const [localDaysOff, setLocalDaysOff] = useState(daysOff);
  const [localAlways, setLocalAlways] = useState(alwaysAvailable);

  const emitChange = (
    newAlways: boolean,
    newDaysOff: string[],
    newSchedule: Props["schedule"]
  ) => {
    onChange({
      alwaysAvailable: newAlways,
      daysOff: newDaysOff,
      schedule: newSchedule,
    });
  };

  const toggleDayOff = (day: string) => {
    const isOff = localDaysOff.includes(day);
    const newDaysOff = isOff
      ? localDaysOff.filter((d) => d !== day)
      : [...localDaysOff, day];
    const newSchedule = isOff ? localSchedule : { ...localSchedule, [day]: [] };
    setLocalDaysOff(newDaysOff);
    setLocalSchedule(newSchedule);
    emitChange(localAlways, newDaysOff, newSchedule);
  };

  const addInterval = (day: string) => {
    const updated = {
      ...localSchedule,
      [day]: [...(localSchedule[day] || []), { start: "", end: "" }],
    };
    setLocalSchedule(updated);
    emitChange(localAlways, localDaysOff, updated);
  };

  const removeInterval = (day: string, index: number) => {
    const updated = {
      ...localSchedule,
      [day]: localSchedule[day]?.filter((_, i) => i !== index) || [],
    };
    setLocalSchedule(updated);
    emitChange(localAlways, localDaysOff, updated);
  };

  const updateSchedule = (
    day: string,
    index: number,
    field: keyof Props["schedule"][string][number],
    value: string
  ) => {
    const updatedDay = [...(localSchedule[day] || [])];
    updatedDay[index][field] = value;
    const updated = { ...localSchedule, [day]: updatedDay };
    setLocalSchedule(updated);
    emitChange(localAlways, localDaysOff, updated);
  };

  const handleAlwaysAvailableChange = (checked: boolean) => {
    const newAlways = checked;
    const newDaysOff = checked ? [] : [...daysOfWeek];
    const newSchedule = {};
    setLocalAlways(newAlways);
    setLocalDaysOff(newDaysOff);
    setLocalSchedule(newSchedule);
    emitChange(newAlways, newDaysOff, newSchedule);
  };

  return (
    <VStack spacing={4} align="stretch">
      <Checkbox
        isChecked={localAlways}
        onChange={(e) => handleAlwaysAvailableChange(e.target.checked)}
        colorScheme="primary"
      >
        {avaliableText}
      </Checkbox>

      {!localAlways && (
        <>
          {errors && (
            <Text color="red.500" fontSize="sm" mt={2}>
              {errors}
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
                  isChecked={localDaysOff.includes(day)}
                  onChange={() => toggleDayOff(day)}
                  colorScheme="primary"
                >
                  Dia sem disponibilidade
                </Checkbox>
              </HStack>

              {!localDaysOff.includes(day) && (
                <>
                  {(localSchedule[day] || []).map((interval, index) => (
                    <HStack key={index}>
                      <Input
                        focusBorderColor="primary.500"
                        type="time"
                        value={interval.start}
                        onChange={(e) =>
                          updateSchedule(day, index, "start", e.target.value)
                        }
                      />
                      <Input
                        focusBorderColor="primary.500"
                        type="time"
                        value={interval.end}
                        onChange={(e) =>
                          updateSchedule(day, index, "end", e.target.value)
                        }
                      />
                      <IconButton
                        aria-label="Remover"
                        icon={<DeleteIcon />}
                        size="sm"
                        onClick={() => removeInterval(day, index)}
                      />
                    </HStack>
                  ))}
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
  );
}
