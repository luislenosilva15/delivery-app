import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { TClient } from "@/store/features/statistics/types/models";

export interface PaginatedClients {
  loading: boolean;
  loadingMore: boolean;
  clients: TClient[];
  page: number;
  totalPages?: number;
  total: number;
  hasMore: boolean;
}

export interface StatisticsState {
  client: PaginatedClients;
}

const initialState: StatisticsState = {
  client: {
    loading: true,
    loadingMore: false,
    clients: [],
    page: 1,
    total: 0,
    hasMore: true,
    totalPages: undefined,
  },
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
        sortBy?: "orders" | "firstOrder" | "lastOrder";
      }>
    ) {
      const page = _action.payload.page;
      if (page === 1) {
        state.client.loading = true;
        state.client.clients = [];
        state.client.hasMore = true;
      } else {
        state.client.loadingMore = true;
      }
      state.client.page = page;
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
      state.client.loading = false;
      state.client.loadingMore = false;
      state.client.total = action.payload.total;
      const { clients, page, totalPages } = action.payload;
      state.client.page = page;
      if (page === 1) {
        state.client.clients = clients;
      } else {
        state.client.clients = [...state.client.clients, ...clients];
      }
      state.client.totalPages = totalPages;
      state.client.hasMore = totalPages
        ? page < totalPages
        : clients.length > 0;
    },

    fetchClientsError(state) {
      state.client.loading = false;
      state.client.loadingMore = false;
    },

    resetStatistics(state) {
      state.client.loading = true;
      state.client.loadingMore = false;
      state.client.clients = [];
      state.client.page = 1;
      state.client.total = 0;
      state.client.hasMore = true;
      state.client.totalPages = undefined;
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
