import type { TCartItem } from "@/store/features/client/types/models";

export type CartProps = {
  item: TCartItem;
  onUpdateQuantity: (id: string, quantity: number) => void;
};
