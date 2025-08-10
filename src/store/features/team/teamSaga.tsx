/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchTeamRequest,
  fetchTeamSuccess,
  setChangeTeamPermissionRequest,
  setChangeTeamPermissionSuccess,
  setCreateNewTeamRequest,
  setCreateNewTeamSuccess,
  setDeleteTeamRequest,
  setDeleteTeamSuccess,
  setToggleActiveTeamRequest,
  setToggleActiveTeamSuccess,
} from "./teamSlice";
import apiClient from "@/api";
import type { AxiosResponse } from "axios";
import { toast } from "@/utils/toast";
import type { PayloadAction } from "@reduxjs/toolkit";
import type {
  ErrorResponse,
  FetchTeamRequest,
  FetchTeamResponse,
  SetChangeTeamPermissionRequest,
  SetChangeTeamPermissionResponse,
  SetCreateNewTeamRequest,
  SetCreateNewTeamResponse,
  SetToggleActiveTeamResponse,
} from "./types/request";

function* fetchTeamSaga(
  action: PayloadAction<FetchTeamRequest>
): Generator<any, void, AxiosResponse<FetchTeamResponse>> {
  try {
    const { payload } = action;

    const response = yield call(
      apiClient.get,
      `/user?page=${payload.page}&search=${payload.search}`
    );

    yield put(
      fetchTeamSuccess({
        users: response.data.users,
        page: payload.page,
        totalPages: response.data.totalPages,
        total: response.data.total,
      })
    );
  } catch {
    toast({
      title: "Erro ao buscar equipe, tente novamente",
      status: "error",
    });
  }
}

function* setCreateNewTeamSaga(
  action: PayloadAction<SetCreateNewTeamRequest>
): Generator<any, void, AxiosResponse<SetCreateNewTeamResponse>> {
  try {
    const { payload } = action;

    yield call(apiClient.post, `/user`, payload.teamData);

    yield put(setCreateNewTeamSuccess());
    yield put(
      fetchTeamRequest({
        page: 1,
        search: "",
      })
    );

    toast({
      title: "Membro da equipe criado com sucesso",
      status: "success",
    });
  } catch (error) {
    const err = error as ErrorResponse;

    toast({
      title: err.response.data.message,
      status: "error",
    });
  }
}

function* setDeleteTeamSaga(
  action: PayloadAction<{ teamId: number }>
): Generator<any, void, AxiosResponse<SetCreateNewTeamResponse>> {
  try {
    const { payload } = action;

    yield call(apiClient.delete, `/user/${payload.teamId}`);

    yield put(
      setDeleteTeamSuccess({
        teamId: payload.teamId,
      })
    );

    toast({
      title: "Membro da equipe excluido com sucesso",
      status: "success",
    });
  } catch (error) {
    const err = error as ErrorResponse;

    toast({
      title: err.response.data.message,
      status: "error",
    });
  }
}

function* setToggleActiveTeamSaga(
  action: PayloadAction<{ teamId: number; isActive: boolean }>
): Generator<any, void, AxiosResponse<SetToggleActiveTeamResponse>> {
  try {
    const { payload } = action;

    const formData = new FormData();

    formData.append("isActive", String(!payload.isActive));

    yield call(apiClient.patch, `/user/${payload.teamId}`, formData);

    yield put(
      setToggleActiveTeamSuccess({
        teamId: payload.teamId,
        isActive: !payload.isActive,
      })
    );

    toast({
      title: !payload.isActive
        ? "Membro da equipe ativado com sucesso"
        : "Membro da equipe desativado com sucesso",
      status: "success",
    });
  } catch (error) {
    const err = error as ErrorResponse;

    toast({
      title: err.response.data.message,
      status: "error",
    });
  }
}

function* setChangeTeamPermissionSaga(
  action: PayloadAction<SetChangeTeamPermissionRequest>
): Generator<any, void, AxiosResponse<SetChangeTeamPermissionResponse>> {
  try {
    const { payload } = action;

    const formData = new FormData();

    formData.append("role", String(payload.permission));

    const response = yield call(
      apiClient.patch,
      `/user/${payload.teamId}`,
      formData
    );

    yield put(
      setChangeTeamPermissionSuccess({
        teamId: payload.teamId,
        permission: response.data.user.role,
      })
    );

    toast({
      title: "Permissão alterada com sucesso",
      status: "success",
    });
  } catch (error) {
    const err = error as ErrorResponse;

    toast({
      title: err.response.data.message,
      status: "error",
    });
  }
}

export default function* TeamSaga() {
  yield takeLatest(fetchTeamRequest.type, fetchTeamSaga);
  yield takeLatest(setCreateNewTeamRequest.type, setCreateNewTeamSaga);
  yield takeLatest(setDeleteTeamRequest.type, setDeleteTeamSaga);
  yield takeLatest(setToggleActiveTeamRequest.type, setToggleActiveTeamSaga);
  yield takeLatest(
    setChangeTeamPermissionRequest.type,
    setChangeTeamPermissionSaga
  );
}
