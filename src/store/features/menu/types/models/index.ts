export type TProductHours = {
  dayOfWeek: number;
  startTime: null | string;
  endTime: null | string;
  closed: boolean;
};

export type TMenu = {
  id: number;
  createdAt: string;
  updatedAt: string;
  companyId: number;
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
  alwaysAvailable: boolean;
  menuHours: TGroupHours[];
  products: TProduct[];
};

export type TProduct = {
  id: number;
  alwaysAvailable: boolean;
  createdAt: string;
  updatedAt: string;
  code: string;
  name: string;
  description: string;
  price: number;
  menuGroupId: number;
  isAdultOnly: boolean;
  image: string | null;
  disabled: boolean;
  imageUrl: string | null;
  productHours?: TProductHours[];
};
