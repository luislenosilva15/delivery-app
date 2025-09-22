/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, takeLatest } from "redux-saga/effects";
import type {
  FetchOrdersCountResponse,
  FetchOrdersRequest,
  FetchOrdersResponse,
} from "./types/request";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { AxiosResponse } from "axios";
import apiClient from "@/api";
import {
  fetchOrdersCountRequest,
  fetchOrdersCountSuccess,
  fetchOrdersRequest,
  fetchOrdersSuccess,
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

export default function* OrderManagerSaga() {
  yield takeLatest(fetchOrdersRequest.type, fetchOrdersSaga);
  yield takeLatest(fetchOrdersCountRequest.type, fetchOrdersCountSaga);
}
