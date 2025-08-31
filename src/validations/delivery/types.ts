export interface DeliverySettingsErrors {
  service?: string;
  payment?: string;
  credit?: string;
  debit?: string;
  voucher?: string;
}

export interface DeliverySettingsData {
  serviceOptions: string[];
  paymentMethods: string[];
  creditFlags: string[];
  debitFlags: string[];
  voucherFlags: string[];
}
