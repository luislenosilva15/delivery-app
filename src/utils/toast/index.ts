import { createStandaloneToast, type UseToastOptions } from "@chakra-ui/react";

const { toast: toastComponent } = createStandaloneToast();

const DEFAULT_OPTIONS: UseToastOptions = {
  duration: 4000,
  position: "top-right",
  isClosable: true,
};

export const toast = (options: UseToastOptions) => {
  toastComponent({ ...DEFAULT_OPTIONS, ...options });
};
