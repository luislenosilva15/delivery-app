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
} from "./types/request";
import {
  fetchCompanyFailure,
  fetchCompanyRequest,
  fetchCompanySuccess,
  fetchGroupsFailure,
  fetchGroupsRequest,
  fetchGroupsSuccess,
} from "./clientSlice";

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

export default function* clientSaga() {
  yield takeLatest(fetchCompanyRequest.type, fetchCompanySaga);
  yield takeLatest(fetchGroupsRequest.type, fetchGroupsSaga);
}
