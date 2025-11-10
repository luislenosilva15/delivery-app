import type { TClient } from "@/store/features/statistics/types/models";

export type Props = {
  isOpen: boolean;
  onClose: () => void;
  client?: TClient | null;
};
