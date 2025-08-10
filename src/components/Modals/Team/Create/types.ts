import type { SetCreateNewTeamRequest } from "@/store/features/team/types/request";

// export type PermissionProfile =
//   | "Administrador"
//   | "Gerente"
//   | "Operador"
//   | "Marketing";

export type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (teamData: SetCreateNewTeamRequest["teamData"]) => void;
  mode?: "create" | "edit";
};
