/* eslint-disable @typescript-eslint/no-unused-vars */
import type { TCompany } from "@/store/features/auth/types/models";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  FetchCompanyRequest,
  FetchCompanySuccess,
  FetchGroupsRequest,
  FetchGroupsSuccess,
} from "./types/request";
import type { TGroup } from "../menu/types/models";

export interface ClientState {
  loading: boolean;
  company: TCompany | null;
  groups: TGroup[] | null;
}

const initialState: ClientState = {
  loading: true,
  company: null,
  groups: null,
};

const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    fetchCompanyRequest(state, _action: PayloadAction<FetchCompanyRequest>) {
      state.loading = true;
    },

    fetchCompanySuccess(state, action: PayloadAction<FetchCompanySuccess>) {
      state.loading = false;
      state.company = action.payload.company;
    },

    fetchCompanyFailure(state) {
      state.loading = false;
    },

    fetchGroupsRequest(state, _action: PayloadAction<FetchGroupsRequest>) {
      state.loading = true;
    },

    fetchGroupsSuccess(state, action: PayloadAction<FetchGroupsSuccess>) {
      state.loading = false;
      state.groups = action.payload.groups;
    },

    fetchGroupsFailure(state) {
      state.loading = false;
    },
  },
});

export const {
  fetchCompanyRequest,
  fetchCompanySuccess,
  fetchCompanyFailure,
  fetchGroupsRequest,
  fetchGroupsSuccess,
  fetchGroupsFailure,
} = clientSlice.actions;

export default clientSlice.reducer;
