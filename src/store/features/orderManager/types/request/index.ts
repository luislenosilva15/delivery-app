import type { TOrder } from "@/store/features/client/types/models";

export type OrderStatus =
  | "PENDING"
  | "IN_PREPARATION"
  | "READY"
  | "OUT_FOR_DELIVERY"
  | "DELIVERED"
  | "CANCELLED";

export interface OrderStatusCount {
  status: OrderStatus;
  _count: {
    status: number;
  };
}

export interface FetchOrdersRequest {
  status: TOrder["status"];
}

export interface FetchOrdersSuccess {
  orders: TOrder[];
}

export interface FetchOrdersResponse {
  orders: TOrder[];
}

export interface FetchOrdersCountResponse {
  total: OrderStatusCount[];
}

export type FetchOrdersCountSuccess = {
  ordersCount: {
    pending: number;
    inPreparation: number;
    ready: number;
    outForDelivery: number;
    delivered: number;
    cancelled: number;
  };
};
