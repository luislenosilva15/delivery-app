import type { TCartItem } from "@/store/features/client/types/models";

export type CartModalProps = {
  isOpen: boolean;
  onClose: () => void;
  items: TCartItem[];
  onUpdateQuantity: (uniqueId: string, quantity: number) => void;
  onSubmit: () => void;
};

export type Payment =
  | "CREDIT_CARD"
  | "DEBIT_CARD"
  | "PIX"
  | "CASH"
  | "VOUCHER"
  | null;

export type SubPayment =
  | "VISA"
  | "MASTERCARD"
  | "ELO"
  | "ALELO"
  | "SODEXO"
  | "TICKET"
  | "VR"
  | null;
