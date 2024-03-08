import { Stack, Typography } from "@mui/material";
import Counter from "../counter/Counter";
import { EnumGameStatus } from "../../types/types";

type GameStatsProps = {
  userName: string;
  mistakes: string[];
  gameStatus: EnumGameStatus;
};

const GameStats = ({ userName, mistakes, gameStatus }: GameStatsProps) => {
  return (
    <Stack>
      <Stack>
        <Typography>Playing: {userName}</Typography>

        <Typography variant="body1">Mistakes: {mistakes.length} / 6</Typography>

        <Typography variant="body1">Status: {gameStatus}</Typography>
      </Stack>

      <Counter gameStatus={gameStatus} />
    </Stack>
  );
};

export default GameStats;
