import { useAppSelector } from "../../hooks/useAppSelector";
import Play from "./Play";

const PlayWrapper = () => {
  const { gameId } = useAppSelector((state) => state.game);

  return <Play key={gameId} />;
};

export default PlayWrapper;
