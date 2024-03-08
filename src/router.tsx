import Start from "./views/start/Start";
import NotFound from "./views/not-found/NotFound";
import Layout from "./views/layout/Layout";
import HighScores from "./views/high-scores/HighScores";
import PlayWrapper from "./views/play/PlayWrapper";
import ProtectedRoute from "./views/protected-route/ProtectedRoute";

const routes = (userName: string) => [
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
        element: (
          <ProtectedRoute condition={userName === ""} to="/">
            <PlayWrapper />
          </ProtectedRoute>
        ),
      },
      {
        path: "high-scores",
        element: <HighScores />,
      },
    ],
  },
];

export default routes;
