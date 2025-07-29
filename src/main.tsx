import { createRoot } from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme/index.tsx";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>
);
