import type { TOrder } from "@/store/features/client/types/models";
import type { OrderStatus } from "@/store/features/orderManager/types/request";

export type Props = {
  order: TOrder;
  onClick: () => void;
  onChangeStatus: (status: OrderStatus, orderId: number) => void;
};
