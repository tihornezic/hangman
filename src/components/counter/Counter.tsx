import { Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { EnumGameStatus } from "../../types/types";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { setDuration } from "../../redux/gameSlice";
import { useNavigate } from "react-router-dom";
import { sendScoringData } from "../../redux/highScoreSlice";
import { useAppSelector } from "../../hooks/useAppSelector";
// import { setGameData } from "../redux/gameSlice";

const Counter = ({ gameStatus }: any) => {
  const dispatch = useAppDispatch();
  const [seconds, setSeconds] = useState(0);
  const timerId = useRef<any>(null);
  const navigate = useNavigate();

  const startTimer = () => {
    timerId.current = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(timerId.current);
    timerId.current = 0;
  };

  const resetTimer = () => {
    stopTimer();
    if (seconds) {
      setSeconds(0);
    }
  };

  // gameStatus === EnumGameStatus.in_progress && startTimer();
  useEffect(() => {
    gameStatus === EnumGameStatus.in_progress && startTimer();
    gameStatus === EnumGameStatus.lose && stopTimer();

    if (gameStatus === EnumGameStatus.win) {
      stopTimer();

      console.log(seconds);
      dispatch(setDuration(seconds));
    }
  }, [gameStatus]);

  return <Typography>Duration: {seconds}s</Typography>;
};

export default Counter;
