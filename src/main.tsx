import { createRoot } from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme/index.tsx";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./store/index.tsx";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </Provider>
);
