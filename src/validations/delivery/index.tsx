import { useState } from "react";
import type { DeliverySettingsData, DeliverySettingsErrors } from "./types";

export const useDeliverySettingsValidation = (data: DeliverySettingsData) => {
  const [errors, setErrors] = useState<DeliverySettingsErrors>({});

  const validate = (): boolean => {
    const newErrors: DeliverySettingsErrors = {};

    if (data.serviceOptions.length === 0) {
      newErrors.service =
        "Selecione pelo menos uma opção (retirada ou delivery).";
    }

    if (data.paymentMethods.length === 0) {
      newErrors.payment = "Selecione pelo menos um método de pagamento.";
    }

    if (
      data.paymentMethods.includes("credit") &&
      data.creditFlags.length === 0
    ) {
      newErrors.credit = "Selecione pelo menos uma bandeira de crédito.";
    }

    if (data.paymentMethods.includes("debit") && data.debitFlags.length === 0) {
      newErrors.debit = "Selecione pelo menos uma bandeira de débito.";
    }

    if (
      data.paymentMethods.includes("voucher") &&
      data.voucherFlags.length === 0
    ) {
      newErrors.voucher = "Selecione pelo menos uma bandeira de voucher.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  return { errors, validate };
};
