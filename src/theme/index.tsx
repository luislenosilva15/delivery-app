import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

// Configuração do modo escuro e uso do sistema
const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: true,
};
const colors = {
  primary: {
    50: "#f0fff4",
    100: "#c6f6d5",
    200: "#9ae6b4",
    300: "#68d391",
    400: "#48bb78",
    500: "#38a169", // tom principal verde
    600: "#2f855a",
    700: "#276749",
    800: "#22543d",
    900: "#1c4532",
  },
};

const theme = extendTheme({
  config,
  colors,
});

export default theme;
