import { daysOfWeek } from "@/contants";
import type { Day } from "@/helpers/normalizeOpeningHour/types";
import type { SetEditOpeningHoursRequest } from "@/store/features/auth/types/request";

export function normalizeSchedule(
  schedule: Record<string, Day>
): SetEditOpeningHoursRequest["schedule"] {
  const result: SetEditOpeningHoursRequest["schedule"] = [];

  for (const dayName of daysOfWeek) {
    const day = schedule[dayName];
    if (!day) continue;

    const dayOfWeek = daysOfWeek.indexOf(dayName);

    if (!day.enabled) {
      result.push({
        dayOfWeek,
        startTime: null,
        endTime: null,
        closed: true,
      });
      continue;
    }

    day.hours.forEach(({ open, close }) => {
      const startTime = open.trim() === "" ? null : open;
      const endTime = close.trim() === "" ? null : close;
      const closed = startTime === null && endTime === null;

      result.push({
        dayOfWeek,
        startTime,
        endTime,
        ...(closed ? { closed: true } : {}),
      });
    });
  }

  return result;
}
