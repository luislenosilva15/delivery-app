export interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (product: FormData) => void;
  groupId?: number;
}

export type FormData = {
  name: string;
  alwaysAvailable: boolean;
  schedule: Record<string, { start: string; end: string }[]>;
  daysOff: string[];
};
