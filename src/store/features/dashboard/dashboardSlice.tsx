import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  FetchDashboardSuccess,
  FetchDashboardFailure,
} from "./types/request";
import type { TDashboardData } from "./types/models";

export interface DashboardState {
  loading: boolean;
  data: TDashboardData | null;
  errorMessage: string | null;
}

const initialState: DashboardState = {
  loading: false,
  data: null,
  errorMessage: null,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    fetchDashboardRequest(state) {
      state.loading = true;
    },

    fetchDashboardSuccess(state, action: PayloadAction<FetchDashboardSuccess>) {
      state.loading = false;
      state.data = action.payload.data;
      state.errorMessage = null;
    },

    fetchDashboardFailure(state, action: PayloadAction<FetchDashboardFailure>) {
      state.loading = false;
      state.errorMessage = action.payload.errorMessage;
    },
  },
});

export const {
  fetchDashboardRequest,
  fetchDashboardSuccess,
  fetchDashboardFailure,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
