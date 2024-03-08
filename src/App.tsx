import { Stack } from "@mui/material";
import { useRoutes } from "react-router-dom";
import routes from "./router";
import { useAppSelector } from "./hooks/useAppSelector";

const App = () => {
  const { userName } = useAppSelector((state) => state.game);
  const routing = useRoutes(routes(userName));

  return <Stack>{routing}</Stack>;
};

export default App;
