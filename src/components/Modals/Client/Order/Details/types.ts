import type { TOrder } from "@/store/features/client/types/models";

export type OrderDetailsProps = {
  isOpen: boolean;
  onClose: () => void;
  order: TOrder;
};
