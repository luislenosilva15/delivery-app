/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, takeLatest } from "redux-saga/effects";

import apiClient from "@/api";
import type { AxiosResponse } from "axios";
import { toast } from "@/utils/toast";
import {
  fetchGroupsError,
  fetchGroupsRequest,
  fetchGroupsSuccess,
  fetchProductsError,
  fetchProductsRequest,
  fetchProductsSuccess,
  setCreateNewGroupRequest,
  setCreateNewGroupSuccess,
  setCreateNewProductRequest,
  setCreateNewProductSuccess,
  setDeleteGroupRequest,
  setDeleteGroupSuccess,
  setToggleDisableGroupRequest,
  setToggleDisableGroupSuccess,
} from "./menuSlice";
import type {
  FetchGroupsResponse,
  FetchProductsRequest,
  FetchProductsResponse,
  SetCreateNewGroupRequest,
  SetCreateNewGroupResponse,
  SetCreateNewProductRequest,
  SetCreateNewProductSuccess,
  SetDeleteGroupRequest,
  SetDeleteGroupResponse,
  SetToggleDisableGroupRequest,
  SetToggleDisableGroupResponse,
} from "./types/request";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  normalizeSchedule,
  normalizeSetCreateNewProductRequest,
} from "./normalize";
import type { ErrorResponse } from "../team/types/request";

function* fetchGroupsSaga(): Generator<
  any,
  void,
  AxiosResponse<FetchGroupsResponse>
> {
  try {
    const response = yield call(apiClient.get, `/menu-group`);

    yield put(
      fetchGroupsSuccess({
        groups: response.data.menuGroups,
      })
    );
  } catch {
    yield put(fetchGroupsError());

    toast({
      title: "Erro ao buscar cardápio, tente novamente",
      status: "error",
    });
  }
}

function* fetchProductsSaga({
  payload: { groupId },
}: PayloadAction<FetchProductsRequest>): Generator<
  any,
  void,
  AxiosResponse<FetchProductsResponse>
> {
  try {
    const response = yield call(apiClient.get, `/product/group/${groupId}`);

    yield put(
      fetchProductsSuccess({
        products: response.data.products,
      })
    );
  } catch {
    yield put(fetchProductsError());
    toast({
      title: "Erro ao buscar produtos, tente novamente",
      status: "error",
    });
  }
}

function* setCreateNewProductSaga(
  action: PayloadAction<SetCreateNewProductRequest>
): Generator<any, void, AxiosResponse<SetCreateNewProductSuccess>> {
  try {
    const { payload } = action;

    const formData = normalizeSetCreateNewProductRequest(
      payload.product,
      payload.menuGroupId
    );

    const response = yield call(apiClient.post, `/product`, formData);

    yield put(setCreateNewProductSuccess({ product: response.data.product }));

    toast({
      title: "Produto criado com sucesso",
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

function* setToggleDisableGroupSaga(
  action: PayloadAction<SetToggleDisableGroupRequest>
): Generator<any, void, AxiosResponse<SetToggleDisableGroupResponse>> {
  try {
    const { payload } = action;

    yield call(apiClient.patch, `/menu-group/${payload.groupId}`, {
      disabled: !payload.disabled,
    });

    yield put(
      setToggleDisableGroupSuccess({
        groupId: payload.groupId,
        disabled: !payload.disabled,
      })
    );

    toast({
      title: payload.disabled
        ? "Grupo ativado com sucesso"
        : "Grupo desativado com sucesso",
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

function* setDeleteGroupSaga(
  action: PayloadAction<SetDeleteGroupRequest>
): Generator<any, void, AxiosResponse<SetDeleteGroupResponse>> {
  try {
    const { payload } = action;

    yield call(apiClient.delete, `/menu-group/${payload.groupId}`);

    yield put(setDeleteGroupSuccess({ groupId: payload.groupId }));

    toast({
      title: "Grupo excluído com sucesso",
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

function* setCreateNewGroupSaga(
  action: PayloadAction<SetCreateNewGroupRequest>
): Generator<any, void, AxiosResponse<SetCreateNewGroupResponse>> {
  try {
    const { payload } = action;

    const response = yield call(apiClient.post, `/menu-group`, {
      ...payload.group,
      productHours: normalizeSchedule(
        payload.group.schedule,
        payload.group.daysOff
      ),
    });

    yield put(setCreateNewGroupSuccess({ group: response.data.group }));

    toast({
      title: "Grupo criado com sucesso",
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

export default function* MenuSaga() {
  yield takeLatest(fetchGroupsRequest.type, fetchGroupsSaga);
  yield takeLatest(fetchProductsRequest.type, fetchProductsSaga);
  yield takeLatest(setCreateNewProductRequest.type, setCreateNewProductSaga);
  yield takeLatest(
    setToggleDisableGroupRequest.type,
    setToggleDisableGroupSaga
  );
  yield takeLatest(setDeleteGroupRequest.type, setDeleteGroupSaga);
  yield takeLatest(setCreateNewGroupRequest.type, setCreateNewGroupSaga);
}
