import type { FormData } from "@/components/Modals/Product/Create/types";
import type { TGroupHours, TProductHours } from "./types/models";
import { daysOfWeek } from "@/constants";

export function normalizeSetCreateNewProductRequest(
  product: FormData,
  groupId: number
) {
  const newFormData = new FormData();

  console.log("PRODUCT", product);

  if (product.name) newFormData.append("name", product.name);
  if (product.name) newFormData.append("menuGroupId", String(groupId));
  if (product.description)
    newFormData.append("description", product.description);
  if (product.price) newFormData.append("price", String(product.price));
  newFormData.append("productAvailabilityBy", product.availability);
  if (product.imageFile) newFormData.append("image", product.imageFile);

  if (product.alwaysAvailable) {
    newFormData.append("alwaysAvailable", String(product.alwaysAvailable));
  } else {
    const schedule = normalizeSchedule(product.schedule, product.daysOff);
    newFormData.append("productHours", JSON.stringify(schedule));
    newFormData.append("alwaysAvailable", String(false));
  }

  return newFormData;
}

export function normalizeSchedule(
  schedule: FormData["schedule"],
  daysOff: string[]
): TProductHours[] | TGroupHours[] {
  const productHours: TProductHours[] | TGroupHours[] = [];

  for (let dayIndex = 0; dayIndex < daysOfWeek.length; dayIndex++) {
    const dayName = daysOfWeek[dayIndex];
    const isClosed = daysOff.includes(dayName);

    if (isClosed) {
      productHours.push({
        dayOfWeek: dayIndex,
        startTime: null,
        endTime: null,
        closed: true,
      });
      continue;
    }

    const intervals = schedule[dayName];

    if (!intervals || intervals.length === 0) {
      productHours.push({
        dayOfWeek: dayIndex,
        startTime: null,
        endTime: null,
        closed: true,
      });
      continue;
    }

    intervals.forEach(({ start, end }) => {
      productHours.push({
        dayOfWeek: dayIndex,
        startTime: start,
        endTime: end,
        closed: false,
      });
    });
  }

  return productHours;
}
