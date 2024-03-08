import Start from "./views/start/Start";
import NotFound from "./views/not-found/NotFound";
import Layout from "./views/layout/Layout";
import HighScores from "./views/high-scores/HighScores";
import PlayWrapper from "./views/play/PlayWrapper";

const routes = () => [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "*",
        element: <NotFound />,
      },
      {
        index: true,
        element: <Start />,
      },
      {
        path: "play",
        element: <PlayWrapper />,
      },
      {
        path: "high-scores",
        element: <HighScores />,
      },
    ],
  },
];

export default routes;
