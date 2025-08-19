import type { ClientState } from "@/store/features/client/clientSlice";
import { useSelector } from "react-redux";

export const useClient = () => {
  return useSelector((state: { client: ClientState }) => state.client);
};
