import type {
  TDelilveryMethod,
  TPaymentCardBrand,
  TPaymentDebitBrand,
  TPaymentMethod,
  TPaymentVoucherBrand,
} from "@/store/features/auth/types/models";

export type TCartItem = {
  uniqueId?: string;
  id: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  observation?: string;
};

export type TOrderStatus =
  | "PENDING"
  | "IN_PREPARATION"
  | "READY"
  | "OUT_FOR_DELIVERY"
  | "DELIVERED"
  | "CANCELLED";

export type TOrderItem = {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  price: number;
  product: {
    id: number;
    name: string;
  };
  observation?: string | null;
};

export type TOrderClient = {
  id: number;
  companyId: number;
  name: string;
  email: string | null;
  phone: string;
  createdAt: string;
  updatedAt: string;
};

export type TOrder = {
  id: number;
  createdAt: string;
  updatedAt: string;
  status: TOrderStatus;
  clientId: number;
  companyId: number;
  totalPrice: number;
  paymentMethod: TPaymentMethod;
  paymentCardBrand: TPaymentCardBrand | null;
  paymentDebitCardBrand: TPaymentDebitBrand | null;
  paymentVoucherBrand: TPaymentVoucherBrand | null;
  deliveryMethod: TDelilveryMethod;
  OrderItem: TOrderItem[];
  client: TOrderClient;
};
