import type { MockOptional } from "@/mocks/optionals";

export type Props = {
  optional: MockOptional;
  onEdit?: (id: number) => void;
  onDisable?: (id: number) => void;
  onDelete?: (id: number) => void;
};
