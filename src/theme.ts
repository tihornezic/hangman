import { createTheme } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: ["Chilanka", "cursive"].join(","),
  },
  palette: {
    primary: {
      main: "#111926",
    },
  },
});

export default theme;
