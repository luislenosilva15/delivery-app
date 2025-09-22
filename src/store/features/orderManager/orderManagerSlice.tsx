/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  FetchOrdersCountSuccess,
  FetchOrdersRequest,
  FetchOrdersSuccess,
} from "./types/request";
import type { TOrder } from "../client/types/models";

export interface OrderManagerState {
  loading: boolean;
  loadingOrdersCount: boolean;
  ordersCount?: {
    pending: number;
    inPreparation: number;
    ready: number;
    outForDelivery: number;
    delivered: number;
    cancelled: number;
  };
  orders: TOrder[];
}

const initialState: OrderManagerState = {
  loading: true,
  loadingOrdersCount: true,
  orders: [],
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
    fetchOrdersRequest(state, action: PayloadAction<FetchOrdersRequest>) {
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
      state.ordersCount = initialState.ordersCount;
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
  },
});

export const {
  fetchOrdersRequest,
  fetchOrdersSuccess,
  fetchOrdersError,
  fetchOrdersCountRequest,
  fetchOrdersCountError,
  fetchOrdersCountSuccess,
} = orderManagerSlice.actions;

export default orderManagerSlice.reducer;
