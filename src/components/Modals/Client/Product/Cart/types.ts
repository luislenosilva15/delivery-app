import type { TCartItem } from "@/store/features/client/types/models";

export type CartModalProps = {
  isOpen: boolean;
  onClose: () => void;
  items: TCartItem[];
  onUpdateQuantity: (uniqueId: string, quantity: number) => void;
  onSubmit: () => void;
};
