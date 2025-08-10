export type TTeamRole = "ADMIN" | "MANAGER" | "OPERATOR" | "MARKETING";

export type TUser = {
  id: number;
  name: string;
  email: string;
  phone?: string | null;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
  role: TTeamRole;
  companyId: number;
  isActive: boolean;
};
