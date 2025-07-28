import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme/index.tsx";
import Sidebar from "./components/Sidebar/index.tsx";

createRoot(document.getElementById("root")!).render(
  <ChakraProvider theme={theme}>
    <StrictMode>
      <Sidebar>aqui a home</Sidebar>
      {/* <LoginPage /> */}
    </StrictMode>
  </ChakraProvider>
);
