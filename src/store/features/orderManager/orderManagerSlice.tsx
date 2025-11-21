/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  FetchOrdersCountSuccess,
  FetchOrdersRequest,
  FetchOrdersSuccess,
  FetchOrderSuccess,
  SetChangeOrderStatusRequest,
  SetChangeOrderStatusSuccess,
} from "./types/request";
import type { TOrder } from "../client/types/models";

export interface OrderManagerState {
  loading: boolean;
  loadingOrdersCount: boolean;
  loadingOrder: boolean;
  currentTab: string;
  ordersCount?: {
    pending: number;
    inPreparation: number;
    ready: number;
    outForDelivery: number;
    delivered: number;
    cancelled: number;
  };
  orders: TOrder[];
  currentOrder?: TOrder | null;
}

const initialState: OrderManagerState = {
  loading: true,
  loadingOrdersCount: true,
  loadingOrder: false,
  currentTab: "PENDING",
  orders: [],
  currentOrder: null,
  ordersCount: {
    pending: 0,
    inPreparation: 0,
    ready: 0,
    outForDelivery: 0,
    delivered: 0,
    cancelled: 0,
  },
};

const orderManagerSlice = createSlice({
  name: "orderManager",
  initialState,
  reducers: {
    fetchOrdersRequest(state, _action: PayloadAction<FetchOrdersRequest>) {
      state.loading = true;
      state.orders = [];
    },

    fetchOrdersSuccess(state, action: PayloadAction<FetchOrdersSuccess>) {
      state.loading = false;
      state.orders = action.payload.orders;
    },

    fetchOrdersError(state) {
      state.loading = false;
    },

    fetchOrdersCountRequest(state) {
      state.loadingOrdersCount = true;
    },

    fetchOrdersCountSuccess(
      state,
      action: PayloadAction<FetchOrdersCountSuccess>
    ) {
      state.loadingOrdersCount = false;
      state.ordersCount = action.payload.ordersCount;
    },
    fetchOrdersCountError(state) {
      state.loadingOrdersCount = false;
    },

    fetchOrderRequest(state, _action) {
      state.loadingOrder = true;
      state.currentOrder = null;
    },

    fetchOrderSuccess(state, action: PayloadAction<FetchOrderSuccess>) {
      state.loadingOrder = false;
      state.currentOrder = action.payload.order;
    },

    fetchOrderError(state) {
      state.loadingOrder = false;
      state.currentOrder = null;
    },

    setChangeOrderStatusRequest(
      _state,
      _action: PayloadAction<SetChangeOrderStatusRequest>
    ) {},

    setChangeOrderStatusSuccess(
      state,
      action: PayloadAction<SetChangeOrderStatusSuccess>
    ) {
      state.orders = state.orders.filter(
        (order) => order.id !== action.payload.orderId
      );
    },
    setCurrentTab(state, action: PayloadAction<string>) {
      state.currentTab = action.payload;
    },
    socketAddNewOrder(state, action: PayloadAction<TOrder>) {
      const shouldAddToList = state.currentTab === "PENDING";
      if (shouldAddToList) {
        state.orders = [action.payload, ...state.orders];
      }
      if (state.ordersCount) {
        state.ordersCount.pending += 1;
      }
    },
  },
});

export const {
  fetchOrdersRequest,
  fetchOrdersSuccess,
  fetchOrdersError,
  fetchOrdersCountRequest,
  fetchOrdersCountError,
  fetchOrdersCountSuccess,
  fetchOrderRequest,
  fetchOrderSuccess,
  fetchOrderError,
  setChangeOrderStatusSuccess,
  setChangeOrderStatusRequest,
  setCurrentTab,
  socketAddNewOrder,
} = orderManagerSlice.actions;

export default orderManagerSlice.reducer;
