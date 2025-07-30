import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

// Configuração do modo escuro e uso do sistema
const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: true,
};
const colors = {
  primary: {
    50: "#ebf8ff",
    100: "#bee3f8",
    200: "#90cdf4",
    300: "#63b3ed",
    400: "#4299e1",
    500: "#3182ce", // tom principal
    600: "#2b6cb0",
    700: "#2c5282",
    800: "#2a4365",
    900: "#1A365D",
  },
};

const theme = extendTheme({
  config,
  colors,
});

export default theme;
