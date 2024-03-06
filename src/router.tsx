import Start from "./views/start/Start";
import Play from "./views/play/Play";
import NotFound from "./views/not-found/NotFound";

const routes = () => [
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/",
    element: <Start />,
  },
  {
    path: "play",
    element: <Play />,
  },
  {
    path: "scores",
    // TODO: make screen
    element: <p>scores</p>,
  },
];

export default routes;
