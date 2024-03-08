import { createTheme } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: ["Chilanka", "cursive"].join(","),
    body2: {
      fontSize: '1.3rem',
    }
  },
  palette: {
    primary: {
      main: "#111926",
    },
  },
  components: {
    MuiToolbar: {
      styleOverrides: {
        root: {
          paddingLeft: "8%",
          paddingRight: "8%",
        },
      },
    },
  },
});

export default theme;
