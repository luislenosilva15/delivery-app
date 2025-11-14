import type {
  PaymentCardBrand,
  PaymentMethods,
  PaymentVoucherBrand,
  PaymentDebitBrand,
  TAvailability,
} from "@/store/features/auth/types/models";

export type FormData = {
  requireCpfCnpj: boolean;
  invoiceDocType: boolean;
  serviceOptions: TAvailability;
  paymentMethods: PaymentMethods;
  creditFlags: PaymentCardBrand;
  debitFlags: PaymentDebitBrand;
  voucherFlags: PaymentVoucherBrand;
};
