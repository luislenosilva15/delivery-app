import type { DashboardState } from "@/store/features/dashboard/dashboardSlice";
import { useSelector } from "react-redux";

export const useDashboard = () => {
  return useSelector((state: { dashboard: DashboardState }) => state.dashboard);
};

export default useDashboard;
