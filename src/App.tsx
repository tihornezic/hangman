import { Stack } from "@mui/material";
import { useRoutes } from "react-router-dom";
import routes from "./router";

const App = () => {
  const routing = useRoutes(routes());

  return (
    <Stack
      sx={{
        minHeight: "100vh",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "common.white",
      }}
    >
      {routing}
    </Stack>
  );
};

export default App;
