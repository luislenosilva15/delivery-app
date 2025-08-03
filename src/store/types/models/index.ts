export type TRole = "ADMIN" | "MANAGER" | "OPERATOR";

export type TCompany = {
  id: 1;
  name: string;
  logoUrl: string;
};

export type TUser = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  role: TRole;
  companyId: number;
};
