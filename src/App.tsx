import { Stack } from "@mui/material";
import { useRoutes } from "react-router-dom";
import routes from "./router";

const App = () => {
  const routing = useRoutes(routes());

  return <Stack>{routing}</Stack>;
};

export default App;
