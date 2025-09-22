import type { FormData } from "../types";

export type DeliveryProps = {
  error: {
    option: string;
  };
  handleChangeOption: (value: string) => void;
  option: string | null;
  handleChangeForm: (field: keyof FormData["delivery"], value: string) => void;
  deliveryFormData: FormData["delivery"];
};
