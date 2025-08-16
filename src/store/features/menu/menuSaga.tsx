/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, takeLatest } from "redux-saga/effects";

import apiClient from "@/api";
import type { AxiosResponse } from "axios";
import { toast } from "@/utils/toast";
import {
  fetchCurrentMenuRequest,
  fetchCurrentMenuSuccess,
  fetchCurrentProductError,
  fetchCurrentProductRequest,
  fetchCurrentProductSuccess,
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
  setDeleteProductRequest,
  setDeleteProductSuccess,
  setEditProductRequest,
  setEditProductSuccess,
  setToggleDisableGroupRequest,
  setToggleDisableGroupSuccess,
  setToggleDisableProductRequest,
  setToggleDisableProductSuccess,
} from "./menuSlice";
import type {
  FetchCurrentMenuResponse,
  FetchCurrentProductRequest,
  FetchCurrentProductResponse,
  FetchGroupsResponse,
  FetchProductsRequest,
  FetchProductsResponse,
  SetCreateNewGroupRequest,
  SetCreateNewGroupResponse,
  SetCreateNewProductRequest,
  SetCreateNewProductSuccess,
  SetDeleteGroupRequest,
  SetDeleteGroupResponse,
  SetDeleteProductRequest,
  SetDeleteProductResponse,
  SetEditProductRequest,
  SetEditProductSuccess,
  SetToggleDisableGroupRequest,
  SetToggleDisableGroupResponse,
  SetToggleDisableProductRequest,
  SetToggleDisableProductResponse,
} from "./types/request";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  normalizeSchedule,
  normalizeSetCreateNewProductRequest,
  normalizeSetEditProductRequest,
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

function* setEditProductSaga(
  action: PayloadAction<SetEditProductRequest>
): Generator<any, void, AxiosResponse<SetEditProductSuccess>> {
  try {
    const { payload } = action;

    const formData = normalizeSetEditProductRequest(payload.product);

    const response = yield call(
      apiClient.patch,
      `/product/${payload.productId}`,
      formData
    );

    yield put(setEditProductSuccess({ product: response.data.product }));

    toast({
      title: "Produto editado com sucesso",
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

function* setDeleteProductSaga(
  action: PayloadAction<SetDeleteProductRequest>
): Generator<any, void, AxiosResponse<SetDeleteProductResponse>> {
  try {
    const { payload } = action;

    yield call(apiClient.delete, `/product/${payload.productId}`);

    yield put(setDeleteProductSuccess({ productId: payload.productId }));

    toast({
      title: "Produto excluído com sucesso",
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
      menuId: payload.menuId,
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

function* fetchCurrentProductSaga(
  action: PayloadAction<FetchCurrentProductRequest>
): Generator<any, void, AxiosResponse<FetchCurrentProductResponse>> {
  try {
    const { payload } = action;

    const response = yield call(apiClient.get, `/product/${payload.productId}`);

    yield put(fetchCurrentProductSuccess({ product: response.data.product }));
  } catch {
    yield put(fetchCurrentProductError());
    toast({
      title: "Erro ao buscar produto, tente novamente",
      status: "error",
    });
  }
}

function* setToggleDisableProductSaga(
  action: PayloadAction<SetToggleDisableProductRequest>
): Generator<any, void, AxiosResponse<SetToggleDisableProductResponse>> {
  try {
    const { payload } = action;

    yield call(apiClient.patch, `/product/disable/${payload.productId}`, {
      disabled: !payload.disabled,
    });

    yield put(
      setToggleDisableProductSuccess({
        productId: payload.productId,
        disabled: !payload.disabled,
      })
    );

    toast({
      title: payload.disabled
        ? "Produto ativado com sucesso"
        : "Produto desativado com sucesso",
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

function* fetchCurrentMenuSaga(): Generator<
  any,
  void,
  AxiosResponse<FetchCurrentMenuResponse>
> {
  try {
    const response = yield call(apiClient.get, `/menu`);

    yield put(fetchCurrentMenuSuccess({ menu: response.data.menus[0] }));
  } catch {
    toast({
      title: "Erro ao buscar menu, tente novamente",
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
  yield takeLatest(fetchCurrentProductRequest.type, fetchCurrentProductSaga);
  yield takeLatest(setEditProductRequest.type, setEditProductSaga);
  yield takeLatest(setDeleteProductRequest.type, setDeleteProductSaga);
  yield takeLatest(
    setToggleDisableProductRequest.type,
    setToggleDisableProductSaga
  );
  yield takeLatest(fetchCurrentMenuRequest.type, fetchCurrentMenuSaga);
}
