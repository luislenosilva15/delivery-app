import type { TTeamRole } from "@/store/features/team/types/models";

export const daysOfWeek = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];

export const profiles: {
  value: TTeamRole;
  label: string;
  description: string;
}[] = [
  {
    value: "ADMIN",
    label: "Administrador",
    description: "Acesso total a todas as seções e edições.",
  },
  {
    value: "MANAGER",
    label: "Gerente",
    description:
      "Acesso a todas as seções, com restrições relacionadas à edição de dados da loja e financeiros.",
  },
  {
    value: "OPERATOR",
    label: "Operador",
    description:
      "Acesso restrito às seções de Pedidos e Cardápio (pode somente alterar visibilidade dos produtos).",
  },
  {
    value: "MARKETING",
    label: "Marketing",
    description: "Acesso total à seção Cardápio e Design.",
  },
];
