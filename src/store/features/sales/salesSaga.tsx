/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, takeLatest } from "redux-saga/effects";
import apiClient from "@/api";
import type { AxiosResponse } from "axios";
import { toast } from "@/utils/toast";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  fetchSalesRequest,
  fetchSalesSuccess,
  fetchSalesError,
} from "./salesSlice";
import { HandleApiError } from "@/utils/errorApi";
import type { FetchSalesResponse } from "./types/requests";
import { normalizeSales } from "./normalize";

function* fetchSalesSaga(
  action: PayloadAction<{
    page: number;
    from?: string;
    to?: string;
    includeRejected?: boolean;
  }>
): Generator<any, void, AxiosResponse<FetchSalesResponse>> {
  try {
    const { page, from, to, includeRejected } = action.payload;

    const startDate = from ? new Date(from).toISOString() : undefined;
    const endDate = to ? new Date(to).toISOString() : undefined;

    const query = `?page=${page}${
      startDate ? `&startDate=${encodeURIComponent(startDate)}` : ""
    }${endDate ? `&endDate=${encodeURIComponent(endDate)}` : ""}${
      includeRejected ? `&includeRejected=true` : ""
    }`;

    const response = yield call(apiClient.get, `/statistic/sales${query}`);

    yield put(
      fetchSalesSuccess({
        sales: normalizeSales(response.data.sales),
        page: page,
        totalPages: response.data.totalPages,
        totalSales: response.data.totalSales,
        totalSeller: response.data.totalSeler,
        averageTicket: Number(response.data.averageTicket) || undefined,
      })
    );
  } catch (error: any) {
    const message = HandleApiError(error);
    toast({ title: message, status: "error" });
    yield put(fetchSalesError());
  }
}

export default function* salesSaga() {
  yield takeLatest(fetchSalesRequest.type, fetchSalesSaga);
}
