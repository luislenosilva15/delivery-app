import type {
  TDelilveryMethod,
  TPaymentCardBrand,
  TPaymentDebitBrand,
  TPaymentMethod,
  TPaymentVoucherBrand,
} from "@/store/features/auth/types/models";
import type { TCartItem } from "@/store/features/client/types/models";

export type CartModalProps = {
  isOpen: boolean;
  onClose: () => void;
  items: TCartItem[];
  onUpdateQuantity: (uniqueId: string, quantity: number) => void;
  onSubmit: (formData: FormData) => void;
};

export type FormData = {
  option: TDelilveryMethod;
  payment: TPaymentMethod | null;
  subPayment:
    | TPaymentVoucherBrand
    | TPaymentCardBrand
    | TPaymentDebitBrand
    | null;
  name: string;
  phone: string;
};
