import type { TSale } from "../models";

export interface FetchSalesResponse {
  sales: Array<TSale>;
  totalSales: number;
  totalPages: number;
  currentPage: number;
  totalSeler: number;
  averageTicket: string | number;
}
