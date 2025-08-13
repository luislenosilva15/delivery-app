// src/hooks/useAuth.ts
import { daysOfWeek } from "@/constants";
import type { Day } from "@/helpers/normalizeOpeningHour/types";
import type { AuthState } from "@/store/features/auth/authSlice";
import type { TCompany } from "@/store/features/auth/types/models";
import { useState } from "react";
import { useSelector } from "react-redux";

export const useAuth = () => {
  return useSelector((state: { auth: AuthState }) => state.auth);
};

export function useScheduleFromOpeningHours(
  openingHours: TCompany["openingHours"]
) {
  const [schedule, setSchedule] = useState<Record<string, Day>>(() => {
    const grouped = daysOfWeek.map((dayName, idx) => {
      const hoursForDay = openingHours.filter((h) => h.dayOfWeek === idx);

      if (hoursForDay.length === 0) {
        return [
          dayName,
          {
            enabled: true,
            hours: [{ open: "", close: "" }],
          },
        ] as [string, Day];
      }

      const enabled = !hoursForDay.every((h) => h.closed);

      return [
        dayName,
        {
          enabled,
          hours: enabled
            ? hoursForDay.map((h) => ({
                open: h.startTime || "",
                close: h.endTime || "",
              }))
            : [{ open: "", close: "" }],
        },
      ] as [string, Day];
    });

    return Object.fromEntries(grouped);
  });

  return [schedule, setSchedule] as const;
}
