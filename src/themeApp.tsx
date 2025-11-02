// src/ThemedApp.tsx
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import App from "./App";
import baseTheme from "./theme";
import { useAuth } from "@/hook/auth";
import { generateCompanyTheme } from "@/helpers/shared";
import { useClient } from "./hook/client";

export default function ThemedApp() {
  const { company } = useAuth();
  const { company: clientCompany } = useClient();

  const currentCompany = company || clientCompany;

  const dynamicTheme = extendTheme({
    ...baseTheme,
    colors: {
      ...baseTheme.colors,
      ...(currentCompany?.themePrimaryColor && {
        primary: generateCompanyTheme(currentCompany.themePrimaryColor),
      }),
    },
  });

  return (
    <ChakraProvider theme={dynamicTheme}>
      <App />
    </ChakraProvider>
  );
}
