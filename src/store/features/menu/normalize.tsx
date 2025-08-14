import type { FormData } from "@/components/Modals/Product/Create/types";
import type { TGroupHours, TProduct, TProductHours } from "./types/models";
import { daysOfWeek } from "@/constants";

export function normalizeSetCreateNewProductRequest(
  product: FormData,
  groupId: number
) {
  const newFormData = new FormData();

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

export function normalizeSetEditProductRequest(product: FormData) {
  const newFormData = new FormData();

  if (product.name) newFormData.append("name", product.name);
  if (product.description)
    newFormData.append("description", product.description);
  if (product.price) newFormData.append("price", String(product.price));
  newFormData.append("productAvailabilityBy", product.availability);

  if (product.imageFile === null) {
    newFormData.append("removeImage", "true");
  }

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

export function denormalizeSchedule(backendSchedule: TProductHours[]): {
  schedule: FormData["schedule"];
  daysOff: string[];
} {
  const schedule: FormData["schedule"] = {};
  const daysOff: string[] = [];

  if (!backendSchedule || !backendSchedule.length) {
    return { schedule, daysOff };
  }

  backendSchedule.forEach((item) => {
    const dayName = daysOfWeek[item.dayOfWeek];

    if (item.closed) {
      if (!daysOff.includes(dayName)) {
        daysOff.push(dayName);
      }
      return;
    }

    if (!schedule[dayName]) {
      schedule[dayName] = [];
    }

    if (item.startTime && item.endTime) {
      schedule[dayName].push({
        start: item.startTime,
        end: item.endTime,
      });
    }
  });

  return { schedule, daysOff };
}

export const formDataProductEditData = (product: TProduct) => {
  const { schedule, daysOff } = denormalizeSchedule(
    product.productHours as TProductHours[]
  );
  return {
    name: product.name,
    description: product.description,
    price: product.price,
    availability: product.productAvailabilityBy,
    image: product.image,
    imageFile: "",
    alwaysAvailable: product.alwaysAvailable,
    schedule,
    daysOff,
  };
};
