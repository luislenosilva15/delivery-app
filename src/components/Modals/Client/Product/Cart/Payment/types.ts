import type { Payment, SubPayment } from "../types";

export type CartPaymentProps = {
  payment: Payment;
  subPayment: SubPayment;
  onChangePayment: (payment: Payment) => void;
  onChangeSubPayment: (subPayment: SubPayment) => void;
  error: {
    payment: string;
  };
};
