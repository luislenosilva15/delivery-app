export interface OpeningHour {
  id: number;
  companyId: number;
  dayOfWeek: number;
  startTime: string | null;
  endTime: string | null;
  closed: boolean;
}

export interface NormalizedDay {
  day: string;
  status: string;
}

export function normalizeOpeningHours(
  openingHours: OpeningHour[]
): NormalizedDay[] {
  const weekDays = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
  ];

  const grouped = Object.values(
    openingHours.reduce<
      Record<
        string,
        { day: string; hours: { startTime: string; endTime: string }[] }
      >
    >((acc, item) => {
      const day = weekDays[item.dayOfWeek];
      if (!acc[day]) {
        acc[day] = { day, hours: [] };
      }

      if (!item.closed && item.startTime && item.endTime) {
        acc[day].hours.push({
          startTime: item.startTime,
          endTime: item.endTime,
        });
      }

      return acc;
    }, {})
  );

  return grouped.map((dayItem) => {
    dayItem.hours.sort((a, b) => a.startTime.localeCompare(b.startTime));

    if (dayItem.hours.length === 0) {
      return { day: dayItem.day, status: "Fechado" };
    }

    return {
      day: dayItem.day,
      status: dayItem.hours
        .map((h) => `${h.startTime}h às ${h.endTime}h`)
        .join(" e "),
    };
  });
}
