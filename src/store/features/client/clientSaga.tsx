/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, takeLatest } from "redux-saga/effects";

import apiClient from "@/api";
import type { AxiosResponse } from "axios";

import { toast } from "@/utils/toast";
import type { PayloadAction } from "@reduxjs/toolkit";
import type {
  FetchCompanyRequest,
  FetchCompanyResponse,
  FetchGroupsRequest,
  FetchGroupsResponse,
  SetAddToCartRequest,
  SetChangeQuantityRequest,
  SetCreateNewOrderRequest,
} from "./types/request";
import {
  fetchCartRequest,
  fetchCartSuccess,
  fetchCompanyFailure,
  fetchCompanyRequest,
  fetchCompanySuccess,
  fetchGroupsFailure,
  fetchGroupsRequest,
  fetchGroupsSuccess,
  setAddToCartRequest,
  setAddToCartSuccess,
  setChangeQuantityRequest,
  setChangeQuantitySuccess,
  setCreateNewOrderError,
  setCreateNewOrderRequest,
  setCreateNewOrderSuccess,
} from "./clientSlice";
import type { TCartItem } from "./types/models";
import { router } from "@/routes";

function* fetchCompanySaga(
  action: PayloadAction<FetchCompanyRequest>
): Generator<any, void, AxiosResponse<FetchCompanyResponse>> {
  try {
    const { payload } = action;

    const response = yield call(apiClient.get, `/client/company/${payload.id}`);

    yield put(
      fetchCompanySuccess({
        company: response.data.company,
      })
    );
  } catch {
    toast({
      title: "Erro ao buscar a empresa",
      status: "error",
    });
    yield put(fetchCompanyFailure());
  }
}

function* fetchGroupsSaga(
  action: PayloadAction<FetchGroupsRequest>
): Generator<any, void, AxiosResponse<FetchGroupsResponse>> {
  try {
    const { payload } = action;

    const response = yield call(
      apiClient.get,
      `/client/menu-group/menu/${payload.menuId}`
    );

    yield put(
      fetchGroupsSuccess({
        groups: response.data.groups,
      })
    );
  } catch {
    toast({
      title: "Erro ao buscar os grupos",
      status: "error",
    });
    yield put(fetchGroupsFailure());
  }
}

function* setAddToCartSaga(
  action: PayloadAction<SetAddToCartRequest>
): Generator<any, void> {
  try {
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");

    const updatedCart = [
      ...existingCart,
      { ...action.payload.item, uniqueId: crypto.randomUUID() },
    ];

    localStorage.setItem("cart", JSON.stringify(updatedCart));

    yield put(
      setAddToCartSuccess({
        item: action.payload.item,
      })
    );
  } catch {
    toast({
      title: "Erro ao adicionar item ao carrinho",
      status: "error",
    });
    yield put(fetchGroupsFailure());
  }
}

function* fetchCartSaga(): Generator<any, void> {
  try {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    yield put(
      fetchCartSuccess({
        items: cart,
      })
    );
  } catch {
    yield put(
      fetchCartSuccess({
        items: [],
      })
    );
  }
}

function* setChangeQuantitySaga(
  action: PayloadAction<SetChangeQuantityRequest>
): Generator<any, void> {
  console.log("Changing quantity for item:", action.payload);
  try {
    const existingCart: TCartItem[] = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );

    let updatedCart: TCartItem[];

    if (action.payload.quantity > 0) {
      updatedCart = existingCart.map((item) =>
        item.uniqueId === action.payload.uniqueId
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
    } else {
      updatedCart = existingCart.filter(
        (item) => item.uniqueId !== action.payload.uniqueId
      );
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));

    yield put(
      setChangeQuantitySuccess({
        uniqueId: action.payload.uniqueId,
        quantity: action.payload.quantity,
      })
    );
  } catch {
    toast({
      title: "Erro ao alterar a quantidade do item",
      status: "error",
    });
    yield put(fetchGroupsFailure());
  }
}

function* setCreateNewOrderSaga(
  action: PayloadAction<SetCreateNewOrderRequest>
): Generator<any, void> {
  try {
    localStorage.removeItem("cart");

    yield put(
      setCreateNewOrderSuccess({
        orderId: crypto.randomUUID(),
      })
    );

    toast({
      title: "Pedido criado com sucesso",
      status: "success",
    });

    router.navigate("order/1");
  } catch {
    toast({
      title: "Erro ao criar o pedido",
      status: "error",
    });
    yield put(setCreateNewOrderError());
  }
}

export default function* clientSaga() {
  yield takeLatest(fetchCompanyRequest.type, fetchCompanySaga);
  yield takeLatest(fetchGroupsRequest.type, fetchGroupsSaga);
  yield takeLatest(setAddToCartRequest.type, setAddToCartSaga);
  yield takeLatest(fetchCartRequest.type, fetchCartSaga);
  yield takeLatest(setChangeQuantityRequest.type, setChangeQuantitySaga);
  yield takeLatest(setCreateNewOrderRequest.type, setCreateNewOrderSaga);
}
