/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, takeLatest } from "redux-saga/effects";
import {
  setAuthValidRequest,
  setAuthValidSuccess,
  setLoginError,
  setLoginRequest,
  setLoginSuccess,
} from "./authSlice";
import apiClient from "@/api";
import type { AxiosResponse } from "axios";
import type {
  AuthResponse,
  LoginRequest,
  LoginResponse,
} from "@/store/types/request";
import { LOCAL_STORAGE_KEYS } from "@/localStorage";
import { toast } from "@/utils/toast";
import type { PayloadAction } from "@reduxjs/toolkit";

function* setLoginSaga(
  action: PayloadAction<LoginRequest>
): Generator<any, void, AxiosResponse<LoginResponse>> {
  try {
    const { payload } = action;

    const response = yield call(apiClient.post, "/auth", {
      email: payload.email,
      password: payload.password,
    });

    yield put(
      setLoginSuccess({
        user: response.data.user,
        company: response.data.company,
      })
    );

    localStorage.setItem(LOCAL_STORAGE_KEYS["token"], response.data.acessToken);

    toast({
      title: "Login realizado com sucesso",
      status: "success",
    });
  } catch {
    toast({
      title: "Erro ao realizar login",
      status: "error",
    });
    yield put(setLoginError());
  }
}

export function* setAuthValidSaga(): Generator<
  any,
  void,
  AxiosResponse<AuthResponse>
> {
  try {
    const response = yield call(apiClient.get, "/auth/me");
    yield put(
      setAuthValidSuccess({
        user: response.data.user,
        company: response.data.company,
      })
    );
  } catch (error) {
    yield put(setLoginError());
    localStorage.removeItem(LOCAL_STORAGE_KEYS["token"]);
    console.log(error);
  }
}

export default function* authSaga() {
  yield takeLatest(setLoginRequest.type, setLoginSaga);
  yield takeLatest(setAuthValidRequest.type, setAuthValidSaga);
}
