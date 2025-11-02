import type { TOrdersCount } from "@/store/features/orderManager/types/models";
import type { OrderStatus } from "@/store/features/orderManager/types/request";
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

export const productStepsModal = [
  { title: "Informações", description: "Dados do produto" },
  { title: "Horários", description: "Configuração de atendimento" },
];

export const groupStepsModal = [
  { title: "Informações", description: "Dados do grupo" },
  { title: "Horários", description: "Configuração de atendimento" },
];

export const cuisineTypes = [
  { value: "PIZZERIA", label: "Pizzaria" },
  { value: "PASTA", label: "Massas" },
  { value: "JAPANESE", label: "Japonesa" },
  { value: "BURGER", label: "Hambúrguer" },
  { value: "VEGAN", label: "Vegana" },
  { value: "BBQ", label: "Churrasco" },
  { value: "SEAFOOD", label: "Frutos do Mar" },
  { value: "SUSHI", label: "Sushi" },
  { value: "CHINESE", label: "Chinesa" },
  { value: "INDIAN", label: "Indiana" },
  { value: "MEXICAN", label: "Mexicana" },
  { value: "THAI", label: "Tailandesa" },
  { value: "ARABIC", label: "Árabe" },
  { value: "BAKERY", label: "Padaria" },
  { value: "CAFE", label: "Cafeteria" },
  { value: "FASTFOOD", label: "Fast Food" },
  { value: "HEALTHY", label: "Saudável" },
  { value: "DESSERT", label: "Sobremesas" },
  { value: "STEAKHOUSE", label: "Churrascaria / Steakhouse" },
  { value: "BRAZILIAN", label: "Brasileira" },
  { value: "OTHERS", label: "Outros" },
];

export const paymentCardBrandTypes = {
  VISA: "Visa",
  MASTERCARD: "Mastercard",
  AMEX: "American Express",
  ELO: "Elo",
  HIPERCARD: "Hipercard",
  OTHER: "Outros",
};

export const paymentVoucherBrandTypes = {
  ALELO: "Alelo",
  SODEXO: "Sodexo",
  BEN: "Ben",
  OTHER: "Outros",
  VEROCHEQUE: "Verocheque",
  VR: "VR",
};

export const PAYMENT_VOUCHER = [
  "ALELO",
  "SODEXO",
  "BEN",
  "VEROCHEQUE",
  "VR",
  "OTHER",
];

export const PAYMENT_CARD = [
  "VISA",
  "MASTERCARD",
  "AMEX",
  "ELO",
  "HIPERCARD",
  "OTHER",
];

export const paymentMethodsTraslations = {
  CREDIT_CARD: "Cartão de Crédito",
  DEBIT_CARD: "Cartão de Débito",
  VOUCHER: "Vale Refeição",
  CASH: "Dinheiro",
  PIX: "PIX",
};

export const deliveryMethodsTranslations = {
  DELIVERY: "Entrega",
  LOCAL: "Retirada",
};

export const orderStatusOptions = [
  { label: "Pendente", color: "yellow" },
  { label: "Aceito", color: "purple" },
  { label: "Preparando", color: "orange" },
  { label: "Entregando", color: "blue" },
  { label: "Concluído", color: "green" },
];

export const statusTabs: Array<{
  label: string;
  color: string;
  status: OrderStatus;
  countKey: keyof TOrdersCount;
}> = [
  {
    label: "Pendente",
    color: "yellow.400",
    status: "PENDING",
    countKey: "pending",
  },
  { label: "Aceito", color: "purple.400", status: "READY", countKey: "ready" },
  {
    label: "Preparando",
    color: "orange.400",
    status: "IN_PREPARATION",
    countKey: "inPreparation",
  },
  {
    label: "Entrega",
    color: "blue.400",
    status: "OUT_FOR_DELIVERY",
    countKey: "outForDelivery",
  },
  {
    label: "Concluído",
    color: "green.400",
    status: "DELIVERED",
    countKey: "delivered",
  },
];

export const orderStatusCardColor = {
  PENDING: "yellow",
  READY: "purple",
  IN_PREPARATION: "orange",
  OUT_FOR_DELIVERY: "blue",
  DELIVERED: "green",
  CANCELLED: "red",
};

export const clientOrderStatusTranslations = {
  PENDING: "Pedido Pendente...",
  READY: "Pedido Aceito",
  IN_PREPARATION: "Pedido em Preparação",
  OUT_FOR_DELIVERY: "Pedido Saiu para Entrega",
  DELIVERED: "Pedido Entregue",
  CANCELLED: "Pedido Cancelado",
};
