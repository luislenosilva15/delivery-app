export type OptionalOption = {
  name: string;
  price: number;
  code: string;
};

export type FormDataSimple = {
  name: string;
  price: number;
  code: string;
};

export type FormDataOptions = {
  name: string;
  min: number;
  max: number;
  canRepeat: boolean;
  options: OptionalOption[];
};

export type FormData = FormDataSimple | FormDataOptions;

export interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FormData & { type: "simple" | "options" }) => void;
}
