import type { StatisticsState } from "@/store/features/statistics/statisticsSlice";
import { useSelector } from "react-redux";

export const useStatistics = () => {
  return useSelector(
    (state: { statistics: StatisticsState }) => state.statistics
  );
};
