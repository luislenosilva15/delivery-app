import type { TProduct } from "@/store/features/menu/types/models";

export type Props = {
  isOpen: boolean;
  onClose: () => void;
  product: TProduct | null;
  addProduct: (
    product: TProduct,
    quantity: number,
    observation?: string
  ) => void;
};
