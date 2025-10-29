/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, takeLatest } from "redux-saga/effects";
import type {
  FetchOrderRequest,
  FetchOrderResponse,
  FetchOrdersCountResponse,
  FetchOrdersRequest,
  FetchOrdersResponse,
  SetChangeOrderStatusRequest,
  SetChangeOrderStatusResponse,
} from "./types/request";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { AxiosResponse } from "axios";
import apiClient from "@/api";
import {
  fetchOrderRequest,
  fetchOrdersCountRequest,
  fetchOrdersCountSuccess,
  fetchOrdersRequest,
  fetchOrdersSuccess,
  fetchOrderSuccess,
  setChangeOrderStatusRequest,
  setChangeOrderStatusSuccess,
} from "./orderManagerSlice";
import { toast } from "@/utils/toast";

function* fetchOrdersSaga(
  action: PayloadAction<FetchOrdersRequest>
): Generator<any, void, AxiosResponse<FetchOrdersResponse>> {
  try {
    const { payload } = action;

    const response = yield call(apiClient.get, `order/${payload.status}`);

    yield put(
      fetchOrdersSuccess({
        orders: response.data.orders,
      })
    );
  } catch {
    toast({
      title: "Erro ao buscar pedidos, tente novamente",
      status: "error",
    });
  }
}

function* fetchOrdersCountSaga(): Generator<
  any,
  void,
  AxiosResponse<FetchOrdersCountResponse>
> {
  try {
    const response = yield call(apiClient.get, `order/count`);

    const ordersCount = {
      pending:
        response.data.total.find((item) => item.status === "PENDING")?._count
          .status || 0,
      inPreparation:
        response.data.total.find((item) => item.status === "IN_PREPARATION")
          ?._count.status || 0,
      ready:
        response.data.total.find((item) => item.status === "READY")?._count
          .status || 0,
      outForDelivery:
        response.data.total.find((item) => item.status === "OUT_FOR_DELIVERY")
          ?._count.status || 0,
      delivered:
        response.data.total.find((item) => item.status === "DELIVERED")?._count
          .status || 0,
      cancelled:
        response.data.total.find((item) => item.status === "CANCELLED")?._count
          .status || 0,
    };

    yield put(
      fetchOrdersCountSuccess({
        ordersCount,
      })
    );
  } catch {
    toast({
      title: "Erro ao buscar pedidos, tente novamente",
      status: "error",
    });
  }
}

function* fetchOrderSaga(
  action: PayloadAction<FetchOrderRequest>
): Generator<any, void, AxiosResponse<FetchOrderResponse>> {
  try {
    const { payload } = action;

    const response = yield call(
      apiClient.get,
      `order/unique/${payload.orderId}`
    );

    yield put(
      fetchOrderSuccess({
        order: response.data.order,
      })
    );
  } catch {
    toast({
      title: "Erro ao buscar pedido, tente novamente",
      status: "error",
    });
  }
}

function* setChangeOrderStatusSaga(
  action: PayloadAction<SetChangeOrderStatusRequest>
): Generator<any, void, AxiosResponse<SetChangeOrderStatusResponse>> {
  try {
    const { payload } = action;

    const response = yield call(apiClient.post, `order/change-status`, {
      newStatus: payload.status,
      orderId: payload.orderId,
    });

    yield put(
      setChangeOrderStatusSuccess({
        orderId: response.data.order.id,
      })
    );
    yield put(fetchOrdersCountRequest());
  } catch {
    toast({
      title: "Erro ao alterar status do pedido, tente novamente",
      status: "error",
    });
  }
}

export default function* OrderManagerSaga() {
  yield takeLatest(fetchOrdersRequest.type, fetchOrdersSaga);
  yield takeLatest(fetchOrdersCountRequest.type, fetchOrdersCountSaga);
  yield takeLatest(fetchOrderRequest.type, fetchOrderSaga);
  yield takeLatest(setChangeOrderStatusRequest.type, setChangeOrderStatusSaga);
}
