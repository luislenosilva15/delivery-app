/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TGroup, TProduct } from "./types/models";
import type {
  FetchGroupsSuccess,
  FetchProductsRequest,
  FetchProductsSuccess,
  SetCreateNewGroupRequest,
  SetCreateNewGroupSuccess,
  SetCreateNewProductRequest,
  SetCreateNewProductSuccess,
  SetDeleteGroupRequest,
  SetDeleteGroupSuccess,
  SetToggleDisableGroupSuccess,
} from "./types/request";

export interface MenuState {
  loading: boolean;
  loadingProducts: boolean;
  groups: TGroup[];
  products: TProduct[];
}

const initialState: MenuState = {
  loading: true,
  loadingProducts: true,
  groups: [],
  products: [],
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    fetchGroupsRequest(state) {
      state.loading = true;
    },

    fetchGroupsSuccess(state, action: PayloadAction<FetchGroupsSuccess>) {
      state.loading = false;
      state.groups = action.payload.groups;
    },

    fetchGroupsError(state) {
      state.loading = false;
    },

    fetchProductsRequest(state, _action: PayloadAction<FetchProductsRequest>) {
      state.loadingProducts = true;
    },

    fetchProductsSuccess(state, action: PayloadAction<FetchProductsSuccess>) {
      state.loadingProducts = false;
      state.products = action.payload.products;
    },

    fetchProductsError(state) {
      state.loadingProducts = false;
    },

    setCreateNewProductRequest(
      _state,
      _action: PayloadAction<SetCreateNewProductRequest>
    ) {},

    setCreateNewProductSuccess(
      state,
      action: PayloadAction<SetCreateNewProductSuccess>
    ) {
      state.products.push(action.payload.product);
    },

    setToggleDisableGroupRequest(
      _state,
      _action: PayloadAction<{ groupId: number; disabled: boolean }>
    ) {},

    setToggleDisableGroupSuccess(
      state,
      action: PayloadAction<SetToggleDisableGroupSuccess>
    ) {
      state.groups = state.groups.map((group) =>
        group.id === action.payload.groupId
          ? { ...group, disabled: action.payload.disabled }
          : group
      );
    },

    setDeleteGroupRequest(
      _state,
      _action: PayloadAction<SetDeleteGroupRequest>
    ) {},

    setDeleteGroupSuccess(state, action: PayloadAction<SetDeleteGroupSuccess>) {
      state.groups = state.groups.filter(
        (group) => group.id !== action.payload.groupId
      );
    },

    setCreateNewGroupRequest(
      _state,
      _action: PayloadAction<SetCreateNewGroupRequest>
    ) {},

    setCreateNewGroupSuccess(
      state,
      action: PayloadAction<SetCreateNewGroupSuccess>
    ) {
      state.groups.push(action.payload.group);
    },
  },
});

export const {
  fetchGroupsRequest,
  fetchGroupsError,
  fetchGroupsSuccess,
  fetchProductsError,
  fetchProductsRequest,
  fetchProductsSuccess,
  setCreateNewProductRequest,
  setCreateNewProductSuccess,
  setToggleDisableGroupRequest,
  setToggleDisableGroupSuccess,
  setDeleteGroupRequest,
  setDeleteGroupSuccess,
  setCreateNewGroupRequest,
  setCreateNewGroupSuccess,
} = menuSlice.actions;

export default menuSlice.reducer;
