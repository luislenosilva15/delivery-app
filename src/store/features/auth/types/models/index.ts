export type TCompany = {
  id: 1;
  name: string;
  logoUrl: string;
  openingHours: TOpeningHours[];
  temporaryClosed: boolean;
  isAlwaysOpening: boolean;
  legalName: string;
  document?: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  createdAt: string;
  updatedAt: string;
};

export type TOpeningHours = {
  id: number;
  companyId: number;
  dayOfWeek: number; // 0 (domingo) a 6 (sábado)
  startTime: string | null; // formato "HH:mm" ou null
  endTime: string | null;
  closed: boolean;
};
