import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import theme from "@chakra-ui/theme";

const customTheme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  fonts: {
    body: `"Source Sans Pro", ${theme.fonts.body}`,
    heading: `"Source Sans Pro", ${theme.fonts.heading}`,
  },
  fontWeights: {
    bold: 600,
  },
  colors: {
    dark: {
      primary: "#1b1b1b",
      secondary: "#242424",
    },
    light: {
      primary: "#f7f7f7",
      secondary: "#ffffff",
    },
  },
  styles: {
    global: (props) => ({
      body: {
        fontFamily: "body",
        fontWeight: "normal",
        color: mode("gray.900", "gray.100")(props),
        bg: mode("light.primary", "dark.primary")(props),
      },
    }),
  },
});

export default customTheme;
