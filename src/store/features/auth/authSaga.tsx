/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, takeLatest } from "redux-saga/effects";
import {
  setAuthValidRequest,
  setAuthValidSuccess,
  setEditUserError,
  setEditUserRequest,
  setEditUserSuccess,
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
  SetEditUserRequest,
  SetEditUserResponse,
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
      title: "Email ou senha inválidos",
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

export function* setEditUserSaga(
  action: PayloadAction<SetEditUserRequest>
): Generator<any, void, AxiosResponse<SetEditUserResponse>> {
  const { id, user } = action.payload;
  try {
    const formData = new FormData();
    user?.name && formData.append("name", user.name);
    user?.phone && formData.append("phone", user.phone);
    user?.imageFile && formData.append("image", user.imageFile);
    user?.password && formData.append("password", user.password);

    if (user?.imageFile === null) {
      formData.append("removeImage", "true");
    }

    const { data } = yield call(() => apiClient.patch(`/user/${id}`, formData));

    yield put(
      setEditUserSuccess({
        user: data.user,
      })
    );
    toast({
      title: "Perfil editado com sucesso",
      status: "success",
    });
  } catch (error) {
    yield put(setEditUserError());
    toast({
      title: "Erro ao editar perfil, tente novamente",
      status: "error",
    });
    console.log(error);
  }
}

export default function* authSaga() {
  yield takeLatest(setLoginRequest.type, setLoginSaga);
  yield takeLatest(setAuthValidRequest.type, setAuthValidSaga);
  yield takeLatest(setEditUserRequest.type, setEditUserSaga);
}
