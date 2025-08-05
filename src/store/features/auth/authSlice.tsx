/* eslint-disable @typescript-eslint/no-unused-vars */
import type { TCompany, TUser } from "@/store/types/models";
import type {
  LoginRequest,
  SetEditUserRequest,
  SetEditUserResponse,
} from "@/store/types/request";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  loading: boolean;
  isSubmitting: boolean;
  isSubmitEditForm: boolean;
  user: TUser | null;
  company: TCompany | null;
  autenticated: boolean;
}

const initialState: AuthState = {
  loading: true,
  user: null,
  company: null,
  autenticated: false,
  isSubmitting: false,
  isSubmitEditForm: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoginRequest(state, _action: PayloadAction<LoginRequest>) {
      state.isSubmitting = true;
    },

    setLoginSuccess(
      state,
      action: PayloadAction<{ user: TUser; company: TCompany }>
    ) {
      state.isSubmitting = false;
      state.user = action.payload.user;
      state.autenticated = true;
      state.company = action.payload.company;
    },

    setLoginError(state) {
      state.loading = false;
      state.isSubmitting = false;
    },

    setAuthValidRequest(state) {
      state.loading = true;
    },

    setAuthValidSuccess(
      state,
      action: PayloadAction<{ user: TUser; company: TCompany }>
    ) {
      state.loading = false;
      state.user = action.payload.user;
      state.company = action.payload.company;
      state.autenticated = true;
    },

    setAuthValidError(state) {
      state.loading = false;
    },

    setLoggout(state) {
      state.user = null;
      state.company = null;
      state.autenticated = false;
    },

    setEditUserRequest(state, _action: PayloadAction<SetEditUserRequest>) {
      state.isSubmitEditForm = true;
    },

    setEditUserSuccess(state, action: PayloadAction<SetEditUserResponse>) {
      state.isSubmitEditForm = false;
      state.user = action.payload.user;
    },

    setEditUserError(state) {
      state.isSubmitEditForm = false;
    },
  },
});

export const {
  setLoginRequest,
  setLoginSuccess,
  setLoginError,
  setAuthValidRequest,
  setAuthValidSuccess,
  setAuthValidError,
  setLoggout,
  setEditUserRequest,
  setEditUserSuccess,
  setEditUserError,
} = authSlice.actions;

export default authSlice.reducer;
