import type { TDashboardData } from "../models";

export type FetchDashboardRequest = void;

export type FetchDashboardSuccess = {
  data: TDashboardData;
};

export type FetchDashboardFailure = {
  errorMessage: string;
};
