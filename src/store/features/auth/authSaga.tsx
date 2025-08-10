/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, takeLatest } from "redux-saga/effects";
import {
  setAlwaysOpenRequest,
  setAlwaysOpenSuccess,
  setAuthValidRequest,
  setAuthValidSuccess,
  setEditCompanyError,
  setEditCompanyRequest,
  setEditCompanySuccess,
  setEditOpeningHoursRequest,
  setEditOpeningHoursSuccess,
  setEditUserError,
  setEditUserRequest,
  setEditUserSuccess,
  setLoginError,
  setLoginRequest,
  setLoginSuccess,
  setTemporaryClosedRequest,
  setTemporaryClosedSuccess,
} from "./authSlice";
import apiClient from "@/api";
import type { AxiosResponse } from "axios";
import type {
  AuthResponse,
  LoginRequest,
  LoginResponse,
  SetEditCompanyRequest,
  SetEditCompanyResponse,
  SetEditOpeningHoursRequest,
  SetEditUserRequest,
  SetEditUserResponse,
  SetTemporaryClosedRequest,
} from "@/store/features/auth/types/request";
import { LOCAL_STORAGE_KEYS } from "@/localStorage";
import { toast } from "@/utils/toast";
import type { PayloadAction } from "@reduxjs/toolkit";
import { normalizeSchedule } from "./normalize";
import type { TCompany } from "@/store/features/auth/types/models";

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

export function* setTemporaryClosedSaga(
  action: PayloadAction<SetTemporaryClosedRequest>
): Generator<any, void, AxiosResponse<string>> {
  try {
    yield call(() =>
      apiClient.post(`opening-hours/temporary-closed`, {
        closed: action.payload.closed,
      })
    );

    yield put(setTemporaryClosedSuccess());
  } catch (error) {
    toast({
      title: "Erro, tente novamente",
      status: "error",
    });
    console.log(error);
  }
}

export function* setEditOpeningHoursSaga(
  action: PayloadAction<SetEditOpeningHoursRequest>
): Generator<any, void, AxiosResponse<TCompany["openingHours"]>> {
  try {
    const openingHoursData = normalizeSchedule(action.payload.schedule as any);

    const { data } = yield call(() =>
      apiClient.patch(`opening-hours`, openingHoursData)
    );

    yield put(
      setEditOpeningHoursSuccess({
        openingHours: data,
      })
    );

    toast({
      title: "Horário de funcionamento editado com sucesso",
      status: "success",
    });
  } catch (error) {
    toast({
      title: "Erro, tente novamente",
      status: "error",
    });
    console.log(error);
  }
}

export function* setAlwaysOpenSaga(): Generator<
  any,
  void,
  AxiosResponse<string>
> {
  try {
    yield call(() => apiClient.post(`opening-hours/always-open`));

    yield put(setAlwaysOpenSuccess());

    toast({
      title: "Horário de funcionamento editado com sucesso",
      status: "success",
    });
  } catch (error) {
    toast({
      title: "Erro, tente novamente",
      status: "error",
    });
    console.log(error);
  }
}

export function* setEditCompanySaga(
  action: PayloadAction<SetEditCompanyRequest>
): Generator<any, void, AxiosResponse<SetEditCompanyResponse>> {
  const { company, id } = action.payload;
  try {
    const formData = new FormData();
    company?.name && formData.append("name", company.name);
    company?.phone && formData.append("phone", company.phone);
    company?.logoFile && formData.append("image", company.logoFile);
    company?.city && formData.append("city", company.city);
    company?.state && formData.append("state", company.state);
    company?.zipCode && formData.append("zipCode", company.zipCode);
    company?.address && formData.append("address", company.address);
    company?.document && formData.append("document", company.document);
    company?.legalName && formData.append("legalName", company.legalName);
    company?.email && formData.append("email", company.email);

    const { data } = yield call(() =>
      apiClient.patch(`/company/${id}`, formData)
    );

    yield put(
      setEditCompanySuccess({
        company: data.company,
      })
    );

    toast({
      title: "Loja editada com sucesso",
      status: "success",
    });
  } catch (error) {
    yield put(setEditCompanyError());
    toast({
      title: "Erro ao editar loja, tente novamente",
      status: "error",
    });
    console.log(error);
  }
}

export default function* authSaga() {
  yield takeLatest(setLoginRequest.type, setLoginSaga);
  yield takeLatest(setAuthValidRequest.type, setAuthValidSaga);
  yield takeLatest(setEditUserRequest.type, setEditUserSaga);
  yield takeLatest(setTemporaryClosedRequest.type, setTemporaryClosedSaga);
  yield takeLatest(setEditOpeningHoursRequest.type, setEditOpeningHoursSaga);
  yield takeLatest(setAlwaysOpenRequest.type, setAlwaysOpenSaga);
  yield takeLatest(setEditCompanyRequest.type, setEditCompanySaga);
}
