import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import LoginPage from "./pages/Login/index.tsx";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme/index.tsx";

createRoot(document.getElementById("root")!).render(
  <ChakraProvider theme={theme}>
    <StrictMode>
      <LoginPage />
    </StrictMode>
  </ChakraProvider>
);
