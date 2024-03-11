import { useAppSelector } from "../../hooks/useAppSelector";
import Play from "./Play";

const PlayWrapper = () => {
  const gameId = useAppSelector((state) => state.game.gameId);

  return <Play key={gameId} />;
};

export default PlayWrapper;
