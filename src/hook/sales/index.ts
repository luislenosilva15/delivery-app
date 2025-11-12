import type { SalesState } from "@/store/features/sales/salesSlice";
import { useSelector } from "react-redux";

export const useSales = () => {
  return useSelector((state: { sales: SalesState }) => state.sales);
};
