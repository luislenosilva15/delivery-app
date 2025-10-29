/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TGroup, TMenu, TProduct } from "./types/models";
import type {
  FetchCurrentGroupRequest,
  FetchCurrentGroupSuccess,
  FetchCurrentMenuSuccess,
  FetchCurrentProductRequest,
  FetchCurrentProductSuccess,
  FetchGroupsSuccess,
  FetchProductsRequest,
  FetchProductsSuccess,
  SetCreateNewGroupRequest,
  SetCreateNewGroupSuccess,
  SetCreateNewProductRequest,
  SetCreateNewProductSuccess,
  SetDeleteGroupRequest,
  SetDeleteGroupSuccess,
  SetDeleteProductRequest,
  SetDeleteProductSuccess,
  SetEditGroupRequest,
  SetEditGroupSuccess,
  SetEditProductRequest,
  SetEditProductSuccess,
  SetToggleDisableGroupSuccess,
  SetToggleDisableProductRequest,
  SetToggleDisableProductSuccess,
} from "./types/request";

export interface MenuState {
  loading: boolean;
  loadingProducts: boolean;
  loadingCurrentGroup: boolean;
  loadingCurrentProduct: boolean;
  currentMenu: TMenu | null;
  groups: TGroup[];
  products: TProduct[];
  currentProduct: TProduct | null;
  currentGroup: TGroup | null;
}

const initialState: MenuState = {
  loading: true,
  loadingProducts: true,
  loadingCurrentGroup: true,
  groups: [],
  products: [],
  currentMenu: null,
  currentProduct: null,
  currentGroup: null,
  loadingCurrentProduct: false,
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
      state.products = [action.payload.product, ...state.products];
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
      state.groups = [...state.groups, action.payload.group];
    },

    fetchCurrentProductRequest(
      state,
      _action: PayloadAction<FetchCurrentProductRequest>
    ) {
      state.loadingCurrentProduct = true;
      state.currentProduct = null;
    },

    fetchCurrentProductSuccess(
      state,
      action: PayloadAction<FetchCurrentProductSuccess>
    ) {
      state.currentProduct = action.payload.product;
      state.loadingCurrentProduct = false;
    },

    fetchCurrentProductError(state) {
      state.loadingCurrentProduct = false;
    },

    setEditProductRequest(
      _state,
      _action: PayloadAction<SetEditProductRequest>
    ) {},

    setEditProductSuccess(state, action: PayloadAction<SetEditProductSuccess>) {
      state.products = state.products.map((product) =>
        product.id === action.payload.product.id
          ? { ...product, ...action.payload.product }
          : product
      );
    },

    setDeleteProductRequest(
      _state,
      _action: PayloadAction<SetDeleteProductRequest>
    ) {},

    setDeleteProductSuccess(
      state,
      action: PayloadAction<SetDeleteProductSuccess>
    ) {
      state.products = state.products.filter(
        (product) => product.id !== action.payload.productId
      );
    },

    setToggleDisableProductRequest(
      _state,
      _action: PayloadAction<SetToggleDisableProductRequest>
    ) {},

    setToggleDisableProductSuccess(
      state,
      action: PayloadAction<SetToggleDisableProductSuccess>
    ) {
      state.products = state.products.map((product) =>
        product.id === action.payload.productId
          ? { ...product, disabled: action.payload.disabled }
          : product
      );
    },

    fetchCurrentMenuRequest(_state) {},

    fetchCurrentMenuSuccess(
      state,
      action: PayloadAction<FetchCurrentMenuSuccess>
    ) {
      state.currentMenu = action.payload.menu;
    },

    fetchCurrentGroupRequest(
      state,
      _action: PayloadAction<FetchCurrentGroupRequest>
    ) {
      state.loadingCurrentGroup = true;
      state.currentGroup = null;
    },

    fetchCurrentGroupSuccess(
      state,
      action: PayloadAction<FetchCurrentGroupSuccess>
    ) {
      state.currentGroup = action.payload.menuGroup;
      state.loadingCurrentGroup = false;
    },

    setEditGroupRequest(_state, _action: PayloadAction<SetEditGroupRequest>) {},

    setEditGroupSuccess(state, action: PayloadAction<SetEditGroupSuccess>) {
      state.groups = state.groups.map((group) =>
        group.id === action.payload.group.id
          ? { ...group, ...action.payload.group }
          : group
      );
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
  fetchCurrentProductRequest,
  fetchCurrentProductSuccess,
  fetchCurrentProductError,
  setEditProductRequest,
  setEditProductSuccess,
  setDeleteProductRequest,
  setDeleteProductSuccess,
  setToggleDisableProductRequest,
  setToggleDisableProductSuccess,
  fetchCurrentMenuRequest,
  fetchCurrentMenuSuccess,
  fetchCurrentGroupRequest,
  fetchCurrentGroupSuccess,
  setEditGroupRequest,
  setEditGroupSuccess,
} = menuSlice.actions;

export default menuSlice.reducer;
