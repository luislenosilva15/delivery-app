export type FormData = {
  requireCpfCnpj: boolean;
  invoiceDocType: string;
  serviceOptions: ("LOCAL" | "DELIVERY")[];
  paymentMethods: ("DEBIT_CARD" | "CREDIT_CARD" | "PIX" | "CASH" | "VOUCHER")[];
  creditFlags: (
    | "VISA"
    | "MASTERCARD"
    | "AMEX"
    | "ELO"
    | "HIPERCARD"
    | "OTHER"
  )[];
  debitFlags: (
    | "VISA"
    | "MASTERCARD"
    | "AMEX"
    | "ELO"
    | "HIPERCARD"
    | "OTHER"
  )[];
  voucherFlags: ("ALELO" | "SODEXO" | "VR" | "BEN" | "VEROCHEQUE" | "OTHER")[];
};
