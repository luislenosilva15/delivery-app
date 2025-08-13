export type TProductAvailabilityBy = "BOTH" | "DELIVERY" | "LOCAL";

export type TProductHours = {
  dayOfWeek: number;
  startTime: null | string;
  endTime: null | string;
  closed: boolean;
};

export type TGroupHours = {
  dayOfWeek: number;
  startTime: null | string;
  endTime: null | string;
  closed: boolean;
};

export type TGroup = {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  menuId: number;
  disabled: boolean;
};

export type TProduct = {
  id: number;
  createdAt: string;
  updatedAt: string;
  code: string;
  name: string;
  description: string;
  price: number;
  menuGroupId: number;
  isAdultOnly: boolean;
  image: string | null;
  productAvailabilityBy: TProductAvailabilityBy;
  disabled: boolean;
  imageUrl: string | null;
};
