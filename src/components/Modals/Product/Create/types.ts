import type { TProductAvailabilityBy } from "@/store/features/menu/types/models";

export type FormData = {
  name: string;
  description: string;
  price: number;
  availability: TProductAvailabilityBy;
  image: string | null;
  imageFile: File | null | string;
  alwaysAvailable: boolean;
  isAdultOnly: boolean;
  code?: string;
  schedule: Record<
    string,
    {
      start: string;
      end: string;
    }[]
  >;
  daysOff: string[];
};

export interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (product: FormData) => void;
  productId?: number | null;
}
