import type { TProduct } from "@/store/features/menu/types/models";

export type Props = {
  item: TProduct;
  onEdit: (id: number) => void;
  onDisable: (id: number) => void;
  onDelete: (id: number) => void;
  onClickCard?: (id: number) => void;
};
