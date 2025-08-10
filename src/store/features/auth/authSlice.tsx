/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Day } from "@/helpers/normalizeOpeningHour/types";
import type { TCompany } from "@/store/features/auth/types/models";
import type {
  LoginRequest,
  SetEditCompanyRequest,
  SetEditCompanyResponse,
  SetEditOpeningHoursSuccess,
  SetEditUserRequest,
  SetEditUserResponse,
} from "@/store/features/auth/types/request";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TUser } from "../team/types/models";

export interface AuthState {
  loading: boolean;
  isSubmitting: boolean;
  isSubmitEditForm: boolean;
  user: TUser | null;
  company: TCompany | null;
  autenticated: boolean;
  isSubmitEditOpeningHoursForm: boolean;
  isSubmitEditCompanyForm: boolean;
}

const initialState: AuthState = {
  loading: true,
  user: null,
  company: null,
  autenticated: false,
  isSubmitting: false,
  isSubmitEditForm: false,
  isSubmitEditOpeningHoursForm: false,
  isSubmitEditCompanyForm: false,
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

    setTemporaryClosedRequest(
      _state,
      _action: PayloadAction<{
        closed: boolean;
      }>
    ) {},

    setTemporaryClosedSuccess(state) {
      if (state.company) {
        state.company.temporaryClosed = !state.company.temporaryClosed;
      }
    },

    setEditOpeningHoursRequest(
      state,
      _action: PayloadAction<{ schedule: Record<string, Day> }>
    ) {
      state.isSubmitEditOpeningHoursForm = true;
    },

    setEditOpeningHoursSuccess(
      state,
      action: PayloadAction<SetEditOpeningHoursSuccess>
    ) {
      state.isSubmitEditOpeningHoursForm = false;

      if (state.company) {
        state.company.openingHours = action.payload.openingHours;
        state.company.isAlwaysOpening = false;
      }
    },

    setEditOpeningHoursError(state) {
      state.isSubmitEditOpeningHoursForm = false;
    },

    setAlwaysOpenRequest(state) {
      state.isSubmitEditOpeningHoursForm = true;
    },

    setAlwaysOpenSuccess(state) {
      state.isSubmitEditOpeningHoursForm = false;

      if (state.company) {
        state.company.isAlwaysOpening = true;
        state.company.openingHours = [];
      }
    },
    setEditCompanyRequest(
      state,
      _action: PayloadAction<SetEditCompanyRequest>
    ) {
      state.isSubmitEditCompanyForm = true;
    },

    setEditCompanySuccess(
      state,
      action: PayloadAction<SetEditCompanyResponse>
    ) {
      state.isSubmitEditCompanyForm = false;
      if (state?.company) {
        state.company = action.payload.company;
      }
    },

    setEditCompanyError(state) {
      state.isSubmitEditCompanyForm = false;
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
  setTemporaryClosedRequest,
  setTemporaryClosedSuccess,
  setEditOpeningHoursError,
  setEditOpeningHoursRequest,
  setEditOpeningHoursSuccess,
  setAlwaysOpenRequest,
  setAlwaysOpenSuccess,
  setEditCompanyError,
  setEditCompanyRequest,
  setEditCompanySuccess,
} = authSlice.actions;

export default authSlice.reducer;
