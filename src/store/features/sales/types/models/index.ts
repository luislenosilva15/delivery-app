import type {
  TDelilveryMethod,
  TPaymentMethod,
} from "@/store/features/auth/types/models";
import type { OrderStatus } from "@/store/features/orderManager/types/request";

export type TSale = {
  id: number;
  createdAt: string;
  updatedAt: string;
  status: OrderStatus;
  clientId: number;
  clientName: string;
  companyId: number;
  totalPrice: number;
  outDeliveryDate?: string | null;
  documentInTicket?: string | null;
  paymentMethod: TPaymentMethod;
  deliveryMethod: TDelilveryMethod;
};
