import type {
  PaymentCardBrand,
  PaymentMethods,
  PaymentVoucherBrand,
  TAvailability,
} from "@/store/features/auth/types/models";

export type FormData = {
  requireCpfCnpj: boolean;
  invoiceDocType: boolean;
  serviceOptions: Partial<TAvailability>;
  paymentMethods: Partial<PaymentMethods>;
  creditFlags: Partial<PaymentCardBrand>;
  debitFlags: Partial<PaymentCardBrand>;
  voucherFlags: Partial<PaymentVoucherBrand>;
};
