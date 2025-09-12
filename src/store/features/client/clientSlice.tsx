/* eslint-disable @typescript-eslint/no-unused-vars */
import type { TCompany } from "@/store/features/auth/types/models";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  FetchCartSuccess,
  FetchCompanyRequest,
  FetchCompanySuccess,
  FetchCurrentOrderRequest,
  FetchCurrentOrderSuccess,
  FetchGroupsRequest,
  FetchGroupsSuccess,
  SetAddToCartRequest,
  SetAddToCartSuccess,
  SetChangeQuantityRequest,
  SetChangeQuantitySuccess,
  SetCreateNewOrderRequest,
  SetCreateNewOrderSuccess,
} from "./types/request";
import type { TGroup } from "../menu/types/models";
import type { TCartItem, TOrder } from "./types/models";

export interface ClientState {
  loading: boolean;
  submittingNewOrder: boolean;
  company: TCompany | null;
  groups: TGroup[] | null;
  loadingCart: boolean;
  loadingOrder: boolean;
  cart: {
    items: TCartItem[];
  };
  currentOrder?: TOrder | null;
}

const initialState: ClientState = {
  loading: true,
  loadingOrder: false,
  submittingNewOrder: false,
  company: null,
  groups: null,
  loadingCart: true,
  cart: {
    items: [],
  },
};

const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    fetchCompanyRequest(state, _action: PayloadAction<FetchCompanyRequest>) {
      state.loading = true;
    },

    fetchCompanySuccess(state, action: PayloadAction<FetchCompanySuccess>) {
      state.loading = false;
      state.company = action.payload.company;
    },

    fetchCompanyFailure(state) {
      state.loading = false;
    },

    fetchGroupsRequest(state, _action: PayloadAction<FetchGroupsRequest>) {
      state.loading = true;
    },

    fetchGroupsSuccess(state, action: PayloadAction<FetchGroupsSuccess>) {
      state.loading = false;
      state.groups = action.payload.groups;
    },

    fetchGroupsFailure(state) {
      state.loading = false;
    },

    setAddToCartRequest(_state, _action: PayloadAction<SetAddToCartRequest>) {
      _state.loadingCart = true;
    },

    setAddToCartSuccess(state, action: PayloadAction<SetAddToCartSuccess>) {
      state.cart.items.push(action.payload.item);
      state.loadingCart = false;
    },

    fetchCartRequest(state) {
      state.loadingCart = true;
    },

    fetchCartSuccess(state, action: PayloadAction<FetchCartSuccess>) {
      state.cart.items = action.payload.items;
      state.loadingCart = false;
    },

    setChangeQuantityRequest(
      _state,
      _action: PayloadAction<SetChangeQuantityRequest>
    ) {},

    setChangeQuantitySuccess(
      state,
      action: PayloadAction<SetChangeQuantitySuccess>
    ) {
      const { uniqueId, quantity } = action.payload;
      const existingIndex = state.cart.items.findIndex(
        (i) => i.uniqueId === uniqueId
      );

      if (existingIndex !== -1) {
        if (quantity > 0) {
          state.cart.items[existingIndex].quantity = quantity;
        } else {
          state.cart.items.splice(existingIndex, 1);
        }
      }
    },

    setCreateNewOrderRequest(
      state,
      _action: PayloadAction<SetCreateNewOrderRequest>
    ) {
      state.submittingNewOrder = true;
    },

    setCreateNewOrderSuccess(
      state,
      action: PayloadAction<SetCreateNewOrderSuccess>
    ) {
      state.submittingNewOrder = false;
      state.cart.items = [];
      state.currentOrder = action.payload.order;
    },

    setCreateNewOrderError(state) {
      state.submittingNewOrder = false;
    },

    fetchCurrentOrderRequest(
      state,
      _action: PayloadAction<FetchCurrentOrderRequest>
    ) {
      state.loadingOrder = true;
    },

    fetchCurrentOrderSuccess(
      state,
      action: PayloadAction<FetchCurrentOrderSuccess>
    ) {
      state.loadingOrder = false;
      state.currentOrder = action.payload.order;
    },

    fetchCurrentOrderFailure(state) {
      state.loadingOrder = false;
      state.currentOrder = null;
    },
  },
});

export const {
  fetchCompanyRequest,
  fetchCompanySuccess,
  fetchCompanyFailure,
  fetchGroupsRequest,
  fetchGroupsSuccess,
  fetchGroupsFailure,
  setAddToCartRequest,
  setAddToCartSuccess,
  fetchCartRequest,
  fetchCartSuccess,
  setChangeQuantityRequest,
  setChangeQuantitySuccess,
  setCreateNewOrderRequest,
  setCreateNewOrderSuccess,
  setCreateNewOrderError,
  fetchCurrentOrderRequest,
  fetchCurrentOrderSuccess,
  fetchCurrentOrderFailure,
} = clientSlice.actions;

export default clientSlice.reducer;
