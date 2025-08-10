import type { TTeamRole } from "@/store/features/team/types/models";

export const normalizeTeamRole = (role: TTeamRole) => {
  const teamRole = {
    ADMIN: "Administrador",
    MANAGER: "Gerente",
    OPERATOR: "Operador",
    MARKETING: "Marketing",
  } as const;

  return teamRole[role];
};
