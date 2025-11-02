import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/index.tsx";
import ThemedApp from "./themeApp.tsx";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <ThemedApp />
  </Provider>
);
