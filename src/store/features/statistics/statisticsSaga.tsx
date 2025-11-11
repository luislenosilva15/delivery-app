/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, takeLatest } from "redux-saga/effects";
import apiClient from "@/api";
import type { AxiosResponse } from "axios";
import { toast } from "@/utils/toast";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  fetchClientsRequest,
  fetchClientsSuccess,
  fetchClientsError,
} from "./statisticsSlice";
import { HandleApiError } from "@/utils/errorApi";
import type { FetchClientsResponse } from "./types/requests";

function* fetchClientsSaga(
  action: PayloadAction<{
    page: number;
    search: string;
    lastOrderDays?: number;
  }>
): Generator<any, void, AxiosResponse<FetchClientsResponse>> {
  try {
    const { payload } = action;

    const { page, search, lastOrderDays, sortBy } = payload as any;

    const query = `?page=${page}&search=${encodeURIComponent(search || "")}${
      lastOrderDays ? `&lastOrderDays=${lastOrderDays}` : ""
    }${sortBy ? `&sortBy=${encodeURIComponent(sortBy)}` : ""}`;

    const response = yield call(apiClient.get, `/statistic/clients${query}`);

    yield put(
      fetchClientsSuccess({
        clients: response.data.clients,
        page: response.data.page || page,
        totalPages: response.data.totalPages,
        total: response.data.totalItems || 0,
      })
    );
  } catch (error: any) {
    const message = HandleApiError(error);
    toast({ title: message, status: "error" });
    yield put(fetchClientsError());
  }
}

export default function* statisticsSaga() {
  yield takeLatest(fetchClientsRequest.type, fetchClientsSaga);
}
