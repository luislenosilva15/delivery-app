import type { TOrder } from "@/store/features/client/types/models";

export const orderActions = (
  status: TOrder["status"]
): { label: string; action: string }[] => {
  let actions: { label: string; action: string }[] = [];

  if (status === "PENDING") {
    actions = [
      { label: "Aceitar Pedido", action: "READY" },
      { label: "Iniciar Preparação", action: "IN_PREPARATION" },
      { label: "Iniciar Entrega", action: "OUT_FOR_DELIVERY" },
      { label: "Marcar como Entregue", action: "DELIVERED" },
      { label: "Cancelar Pedido", action: "CANCELLED" },
    ];
  } else if (status === "READY") {
    actions = [
      { label: "Iniciar Preparação", action: "IN_PREPARATION" },
      { label: "Iniciar Entrega", action: "OUT_FOR_DELIVERY" },
      { label: "Marcar como Entregue", action: "DELIVERED" },
      { label: "Cancelar Pedido", action: "CANCELLED" },
    ];
  } else if (status === "IN_PREPARATION") {
    actions = [
      { label: "Iniciar Entrega", action: "OUT_FOR_DELIVERY" },
      { label: "Marcar como Entregue", action: "DELIVERED" },
      { label: "Cancelar Pedido", action: "CANCELLED" },
    ];
  } else if (status === "OUT_FOR_DELIVERY") {
    actions = [
      { label: "Marcar como Entregue", action: "DELIVERED" },
      { label: "Cancelar Pedido", action: "CANCELLED" },
    ];
  }

  return actions;
};
