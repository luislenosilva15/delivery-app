import type { OrderManagerState } from "@/store/features/orderManager/orderManagerSlice";
import { useSelector } from "react-redux";

export const useOrderManager = () => {
  return useSelector(
    (state: { orderManager: OrderManagerState }) => state.orderManager
  );
};
