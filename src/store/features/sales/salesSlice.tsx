import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TSale } from "./types/models";

export interface PaginatedSales {
  loading: boolean;
  loadingMore: boolean;
  sales: TSale[];
  page: number;
  totalPages?: number;
  total: number;
  hasMore: boolean;
  totalSeller?: number;
  averageTicket?: number;
}

export interface SalesState {
  sales: PaginatedSales;
}

const initialState: SalesState = {
  sales: {
    loading: true,
    loadingMore: false,
    sales: [],
    page: 1,
    total: 0,
    hasMore: true,
    totalPages: undefined,
    totalSeller: undefined,
    averageTicket: undefined,
  },
};

const salesSlice = createSlice({
  name: "sales",
  initialState,
  reducers: {
    fetchSalesRequest(
      state,
      _action: PayloadAction<{
        page: number;
        from?: string;
        to?: string;
        includeRejected?: boolean;
      }>
    ) {
      const page = _action.payload.page;
      if (page === 1) {
        state.sales.loading = true;
        state.sales.sales = [];
        state.sales.hasMore = true;
      } else {
        state.sales.loadingMore = true;
      }
      state.sales.page = page;
    },
    fetchSalesSuccess(
      state,
      action: PayloadAction<{
        sales: TSale[];
        page: number;
        totalPages?: number;
        totalSales: number;
        totalSeller?: number;
        averageTicket?: number;
      }>
    ) {
      state.sales.loading = false;
      state.sales.loadingMore = false;
      state.sales.total = action.payload.totalSales;
      const { sales, page, totalPages, totalSeller, averageTicket } =
        action.payload;
      state.sales.page = page;
      if (page === 1) {
        state.sales.sales = sales;
      } else {
        state.sales.sales = [...state.sales.sales, ...sales];
      }
      state.sales.totalPages = totalPages;
      state.sales.hasMore = totalPages ? page < totalPages : sales.length > 0;
      state.sales.totalSeller = totalSeller;
      state.sales.averageTicket = averageTicket;
    },
    fetchSalesError(state) {
      state.sales.loading = false;
      state.sales.loadingMore = false;
    },
    resetSales(state) {
      state.sales.loading = true;
      state.sales.loadingMore = false;
      state.sales.sales = [];
      state.sales.page = 1;
      state.sales.total = 0;
      state.sales.hasMore = true;
      state.sales.totalPages = undefined;
      state.sales.totalSeller = undefined;
      state.sales.averageTicket = undefined;
    },
  },
});

export const {
  fetchSalesRequest,
  fetchSalesSuccess,
  fetchSalesError,
  resetSales,
} = salesSlice.actions;

export default salesSlice.reducer;
