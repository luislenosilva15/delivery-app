import type { TeamState } from "@/store/features/team/teamSlice";
import { useSelector } from "react-redux";

export const useTeam = () => {
  return useSelector((state: { team: TeamState }) => state.team);
};
