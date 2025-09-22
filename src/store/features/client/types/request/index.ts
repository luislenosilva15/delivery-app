import type {
  TCompany,
  TDelilveryMethod,
  TPaymentCardBrand,
  TPaymentDebitBrand,
  TPaymentMethod,
  TPaymentVoucherBrand,
} from "@/store/features/auth/types/models";
import type { TGroup } from "@/store/features/menu/types/models";
import type { TCartItem, TOrder } from "../models";

export interface FetchCompanyRequest {
  id: number;
}

export interface FetchCompanyResponse {
  company: TCompany;
}

export interface FetchCompanySuccess {
  company: TCompany;
}

export interface FetchGroupsRequest {
  menuId: number;
}

export interface FetchGroupsResponse {
  groups: TGroup[];
}

export interface FetchGroupsSuccess {
  groups: TGroup[];
}

export interface SetAddToCartRequest {
  item: TCartItem;
}

export interface SetAddToCartSuccess {
  item: TCartItem;
}

export interface FetchCartSuccess {
  items: TCartItem[];
}

export interface SetChangeQuantityRequest {
  uniqueId: string;
  quantity: number;
}

export interface SetChangeQuantitySuccess {
  uniqueId: string;
  quantity: number;
}

export interface SetCreateNewOrderRequest {
  items: TCartItem[];
  phone: string;
  name: string;
  deliveryMethod: TDelilveryMethod;
  payment: {
    method: TPaymentMethod;
    cardBrand?: TPaymentCardBrand | null;
    debitCardBrand?: TPaymentDebitBrand | null;
    voucherBrand?: TPaymentVoucherBrand | null;
    totalPrice: number;
  };
  delivery: {
    cep?: string;
    street?: string;
    number?: string;
    complement?: string;
    reference?: string;
  };
  companyId: number;
}

export interface SetCreateNewOrderSuccess {
  order: TOrder;
}

export interface SetCreateNewOrderResponse {
  order: TOrder;
}

export interface FetchCurrentOrderRequest {
  orderId: number;
}

export interface FetchCurrentOrderResponse {
  order: TOrder;
}

export interface FetchCurrentOrderSuccess {
  order: TOrder;
}
