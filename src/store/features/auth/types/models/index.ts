export type TCuisineType =
  | "PIZZERIA"
  | "PASTA"
  | "JAPANESE"
  | "BURGER"
  | "VEGAN"
  | "BBQ"
  | "SEAFOOD"
  | "SUSHI"
  | "CHINESE"
  | "INDIAN"
  | "MEXICAN"
  | "THAI"
  | "ARABIC"
  | "BAKERY"
  | "CAFE"
  | "FASTFOOD"
  | "HEALTHY"
  | "DESSERT"
  | "STEAKHOUSE"
  | "BRAZILIAN"
  | "OTHERS";

export type TAvailability = ("DELIVERY" | "LOCAL")[];

export type TPaymentMethod =
  | "CREDIT_CARD"
  | "DEBIT_CARD"
  | "PIX"
  | "CASH"
  | "VOUCHER";

export type TPaymentCardBrand =
  | "VISA"
  | "MASTERCARD"
  | "AMEX"
  | "ELO"
  | "HIPERCARD"
  | "OTHER";

export type TPaymentDebitBrand =
  | "VISA"
  | "MASTERCARD"
  | "AMEX"
  | "ELO"
  | "HIPERCARD"
  | "OTHER";

export type TPaymentVoucherBrand =
  | "ALELO"
  | "SODEXO"
  | "VR"
  | "BEN"
  | "VEROCHEQUE"
  | "OTHER";

export type TDelilveryMethod = "LOCAL" | "DELIVERY";

export type PaymentMethods = (
  | "CREDIT_CARD"
  | "DEBIT_CARD"
  | "PIX"
  | "CASH"
  | "VOUCHER"
)[];

export type PaymentCardBrand = (
  | "VISA"
  | "MASTERCARD"
  | "AMEX"
  | "ELO"
  | "HIPERCARD"
  | "OTHER"
)[];

export type PaymentDebitBrand = (
  | "VISA"
  | "MASTERCARD"
  | "AMEX"
  | "ELO"
  | "HIPERCARD"
  | "OTHER"
)[];

export type PaymentVoucherBrand = (
  | "ALELO"
  | "SODEXO"
  | "VR"
  | "BEN"
  | "VEROCHEQUE"
  | "OTHER"
)[];

export type TCompanyPayment = {
  id?: number;
  method: PaymentMethods;
  cardBrand: PaymentCardBrand;
  debitCardBrand: PaymentDebitBrand;
  voucherBrand: PaymentVoucherBrand;
  documentInTicket: boolean;
  requiredDocument: boolean;
};

export interface DeliveryFeeTier {
  id: number;
  deliveryFeeId: number;
  maxKm: number;
  price: number;
  isFree: boolean;
  estimatedTime: number;
}

export type DeliveryFeeType = "DISTANCE_BASED" | "FIXED";

export interface DeliveryFeeConfig {
  id: number;
  companyId: number;
  type: DeliveryFeeType;
  fixedFee: number;
  isFree: boolean;
  estimatedTime: number;
  tiers: DeliveryFeeTier[];
}

export type TAddress = {
  id: number;
  street: string;
  number: string;
  city: string;
  state: string;
  complement?: string;
  zipCode: string;
  coordinates: string;
};

export type TCompany = {
  id: 1;
  availability: TAvailability;
  name: string;
  logoUrl: string;
  openingHours: TOpeningHours[];
  temporaryClosed: boolean;
  isAlwaysOpening: boolean;
  deliveryFee: DeliveryFeeConfig;
  legalName: string;
  document?: string;
  email: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
  isOpen?: boolean;
  cuisineType: TCuisineType;
  menuId?: number;
  themePrimaryColor: string;
  companyPayment: TCompanyPayment;
  address: TAddress;
};

export type TOpeningHours = {
  id: number;
  companyId: number;
  dayOfWeek: number;
  startTime: string | null;
  endTime: string | null;
  closed: boolean;
};
