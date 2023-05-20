import { theme } from "@chakra-ui/react"

const appTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    primary: "#405ce8",
    blue: {
      50: "#e5effd",
      100: "#c8defc",
      200: "#a8cafb",
      300: "#81b3fa",
      400: "#4f95f8",
      500: "#0066f5",
      600: "#005cdd",
      700: "#0050c1",
      800: "#00429f",
      900: "#002e70",
    },
    gray: {
      50: "#e8ecf1",
      100: "#cfd7e2",
      200: "#b2bed1",
      300: "#8fa1bc",
      400: "#6079a0",
      500: "#022b69",
      600: "#01265d",
      700: "#01204f",
      800: "#01193f",
      900: "#001028",
    },
  },
}

export default appTheme
