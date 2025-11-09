import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { TClient } from "@/store/features/statistics/types/models";

export interface StatisticsState {
  loading: boolean;
  loadingMore: boolean;
  clients: TClient[];
  page: number;
  totalPages?: number;
  total: number;
  hasMore: boolean;
  errorMessage?: string | null;
}

const initialState: StatisticsState = {
  loading: true,
  loadingMore: false,
  clients: [],
  page: 1,
  total: 0,
  hasMore: true,
  errorMessage: null,
};

const statisticsSlice = createSlice({
  name: "statistics",
  initialState,
  reducers: {
    fetchClientsRequest(
      state,
      _action: PayloadAction<{
        page: number;
        search: string;
        lastOrderDays?: number;
      }>
    ) {
      const page = _action.payload.page;
      if (page === 1) {
        state.loading = true;
        state.clients = [];
        state.hasMore = true;
      } else {
        state.loadingMore = true;
      }
      state.page = page;
    },

    fetchClientsSuccess(
      state,
      action: PayloadAction<{
        clients: TClient[];
        page: number;
        totalPages?: number;
        total: number;
      }>
    ) {
      state.loading = false;
      state.loadingMore = false;
      state.total = action.payload.total;
      const { clients, page, totalPages } = action.payload;
      state.page = page;
      if (page === 1) {
        state.clients = clients;
      } else {
        state.clients = [...state.clients, ...clients];
      }
      state.totalPages = totalPages;
      state.hasMore = totalPages ? page < totalPages : clients.length > 0;
    },

    fetchClientsError(state) {
      state.loading = false;
      state.loadingMore = false;
    },

    resetStatistics(state) {
      state.loading = true;
      state.loadingMore = false;
      state.clients = [];
      state.page = 1;
      state.total = 0;
      state.hasMore = true;
      state.errorMessage = null;
    },
  },
});

export const {
  fetchClientsRequest,
  fetchClientsSuccess,
  fetchClientsError,
  resetStatistics,
} = statisticsSlice.actions;

export default statisticsSlice.reducer;
