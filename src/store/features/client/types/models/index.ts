import type {
  TDelilveryMethod,
  TPaymentCardBrand,
  TPaymentDebitBrand,
  TPaymentMethod,
  TPaymentVoucherBrand,
} from "@/store/features/auth/types/models";
import type { OrderStatus } from "@/store/features/orderManager/types/request";

export type TError = {
  response: {
    data: {
      message: string;
      statusCode: number;
    };
  };
};

export type TCartItem = {
  uniqueId?: string;
  id: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  observation?: string;
};

export type TDeliveryAddress = {
  id: number;
  orderId: number;
  cep: string;
  street: string;
  number: string;
  complement?: string;
  reference?: string;
};

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
  status: OrderStatus;
  clientId: number;
  companyId: number;
  totalPrice: number;
  paymentMethod: TPaymentMethod;
  documentInTicket: string | null;
  paymentCardBrand: TPaymentCardBrand | null;
  paymentDebitCardBrand: TPaymentDebitBrand | null;
  paymentVoucherBrand: TPaymentVoucherBrand | null;
  deliveryMethod: TDelilveryMethod;
  OrderItem: TOrderItem[];
  deliveryAddress: TDeliveryAddress | null;
  client: TOrderClient;
  outDeliveryDate: string;
};
