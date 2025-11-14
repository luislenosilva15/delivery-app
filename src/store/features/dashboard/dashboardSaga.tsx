/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, takeLatest } from "redux-saga/effects";
import { toast } from "@/utils/toast";
import {
  fetchDashboardRequest,
  fetchDashboardSuccess,
  fetchDashboardFailure,
} from "./dashboardSlice";
import apiClient from "@/api";

function* fetchDashboardSaga(): Generator<any, void, any> {
  try {
    const response: any = yield call(apiClient.get, "/statistic/dashboard");
    const data = response?.data;

    yield put(fetchDashboardSuccess({ data }));
  } catch {
    toast({ title: "Erro ao buscar dados do dashboard", status: "error" });
    yield put(
      fetchDashboardFailure({
        errorMessage: "Erro ao buscar dados do dashboard",
      })
    );
  }
}

export default function* dashboardSaga() {
  yield takeLatest(fetchDashboardRequest.type, fetchDashboardSaga);
}
