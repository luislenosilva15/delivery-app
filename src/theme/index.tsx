import { extendTheme, type ThemeConfig } from "@chakra-ui/react";
import { mode, type StyleFunctionProps } from "@chakra-ui/theme-tools";

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
  semanticTokens: {
    colors: {
      "bg.canvas": { default: "gray.50", _dark: "gray.900" },
      "bg.surface": { default: "white", _dark: "gray.800" },
      "border.subtle": { default: "gray.200", _dark: "gray.700" },
      "text.default": { default: "gray.800", _dark: "gray.100" },
      "text.muted": { default: "gray.600", _dark: "gray.400" },
    },
  },
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        bg: mode("bg.canvas", "bg.canvas")(props),
        color: mode("text.default", "text.default")(props),
      },
    }),
  },
  components: {
    Modal: {
      baseStyle: (props: StyleFunctionProps) => ({
        dialog: {
          bg: mode("bg.surface", "bg.surface")(props),
          borderWidth: "1px",
          borderColor: mode("border.subtle", "border.subtle")(props),
          boxShadow: mode("lg", "dark-lg")(props),
        },
      }),
    },
    Tabs: {
      baseStyle: (props: StyleFunctionProps) => ({
        tablist: {
          borderBottom: "1px solid",
          borderColor: mode("border.subtle", "border.subtle")(props),
        },
        tab: {
          _selected: {
            color: mode("gray.800", "yellow.300")(props),
            borderBottom: "2px solid",
            borderColor: mode("gray.300", "yellow.400")(props),
          },
        },
      }),
    },
    Divider: {
      baseStyle: (props: StyleFunctionProps) => ({
        borderColor: mode("border.subtle", "border.subtle")(props),
      }),
    },
    Drawer: {
      baseStyle: (props: StyleFunctionProps) => ({
        dialog: {
          bg: mode("bg.surface", "bg.surface")(props),
          borderLeftWidth: "1px",
          borderColor: mode("border.subtle", "border.subtle")(props),
          boxShadow: mode("lg", "dark-lg")(props),
        },
      }),
    },
    Popover: {
      baseStyle: (props: StyleFunctionProps) => ({
        content: {
          bg: mode("bg.surface", "bg.surface")(props),
          borderWidth: "1px",
          borderColor: mode("border.subtle", "border.subtle")(props),
          boxShadow: mode("md", "dark-lg")(props),
        },
      }),
    },
    Menu: {
      baseStyle: (props: StyleFunctionProps) => ({
        list: {
          bg: mode("bg.surface", "bg.surface")(props),
          borderWidth: "1px",
          borderColor: mode("border.subtle", "border.subtle")(props),
          boxShadow: mode("md", "dark-lg")(props),
        },
      }),
    },
    Input: {
      defaultProps: {
        variant: "outline",
        size: "md",
        focusBorderColor: "gray.400",
      },
      variants: {
        outline: (props: StyleFunctionProps) => ({
          field: {
            bg: mode("bg.surface", "gray.800")(props),
            borderColor: mode("gray.300", "gray.600")(props),
            _hover: { borderColor: mode("gray.400", "gray.500")(props) },
            _focusVisible: {
              borderColor: mode("gray.500", "yellow.300")(props),
              boxShadow: "none",
            },
          },
        }),
      },
    },
    Select: {
      defaultProps: {
        variant: "outline",
        size: "md",
        focusBorderColor: "gray.400",
      },
      variants: {
        outline: (props: StyleFunctionProps) => ({
          field: {
            bg: mode("bg.surface", "gray.800")(props),
            borderColor: mode("gray.300", "gray.600")(props),
            _hover: { borderColor: mode("gray.400", "gray.500")(props) },
            _focusVisible: {
              borderColor: mode("gray.500", "yellow.300")(props),
              boxShadow: "none",
            },
          },
        }),
      },
    },
    Textarea: {
      defaultProps: {
        variant: "outline",
        size: "md",
        focusBorderColor: "gray.400",
      },
      variants: {
        outline: (props: StyleFunctionProps) => ({
          field: {
            bg: mode("bg.surface", "gray.800")(props),
            borderColor: mode("gray.300", "gray.600")(props),
            _hover: { borderColor: mode("gray.400", "gray.500")(props) },
            _focusVisible: {
              borderColor: mode("gray.500", "yellow.300")(props),
              boxShadow: "none",
            },
          },
        }),
      },
    },
    Card: {
      baseStyle: (props: StyleFunctionProps) => ({
        container: {
          bg: mode("bg.surface", "gray.800")(props),
          borderWidth: "1px",
          borderColor: mode("border.subtle", "border.subtle")(props),
          boxShadow: mode("sm", "dark-lg")(props),
        },
      }),
    },
  },
});

export default theme;
