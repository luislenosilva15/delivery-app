import type {
  TPaymentMethod,
  TPaymentCardBrand,
  TPaymentDebitBrand,
  TPaymentVoucherBrand,
} from "@/store/features/auth/types/models";

export type SubPayment =
  | TPaymentVoucherBrand
  | TPaymentCardBrand
  | TPaymentDebitBrand
  | null;

export type CartPaymentProps = {
  payment: TPaymentMethod | null;
  subPayment: SubPayment;
  onChangePayment: (payment: TPaymentMethod | null) => void;
  onChangeSubPayment: (subPayment: SubPayment) => void;
  error: {
    payment: string;
  };
};
