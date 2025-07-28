import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark", // pode ser "dark" para começar no modo escuro
  useSystemColorMode: true, // usar o tema do sistema (Windows/Mac)
};

const theme = extendTheme({ config });

export default theme;
