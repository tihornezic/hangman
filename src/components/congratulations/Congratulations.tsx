import { Button, Stack, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useNavigate } from "react-router-dom";
import { calculateScore } from "../../helpers/helpers";

const Congratulations = () => {
  const gameData = useAppSelector((state) => state.game);
  const navigate = useNavigate();

  const [seconds, setSeconds] = useState(5);
  const timerId = useRef<any>(null);

  const stopTimer = () => {
    clearInterval(timerId.current);
    timerId.current = 0;
  };

  useEffect(() => {
    timerId.current = setInterval(() => {
      setSeconds((prev) => {
        if (prev === 1) navigate("/high-scores");
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerId.current);
  }, [navigate]);

  return (
    <Stack spacing={4}>
      <Typography variant="h5">
        Congratulations {gameData.userName}, you won!
      </Typography>

      <Stack>
        <Typography>Duration: {gameData.duration}s</Typography>
        <Typography>Mistakes: {gameData.errors.length}</Typography>
        <Typography>Score: {calculateScore(gameData.errors.length)}</Typography>
      </Stack>

      <Typography variant="h6">
        Redirecting to High scores in... {seconds}
      </Typography>

      <Button
        onClick={() => stopTimer()}
        variant="contained"
        sx={{ m: 0, right: 0 }}
      >
        Cancel
      </Button>
    </Stack>
  );
};

export default Congratulations;