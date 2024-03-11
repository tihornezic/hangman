import { Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { EnumGameStatus } from "../../types/types";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { setDuration } from "../../redux/gameSlice";

let startTime: number, interval: ReturnType<typeof setInterval>;

type CounterProps = {
  gameStatus: EnumGameStatus;
};

const Counter = ({ gameStatus }: CounterProps) => {
  const dispatch = useAppDispatch();
  const [seconds, setSeconds] = useState(0);
  const [milliseconds, setMilliseconds] = useState(0);
  const secondsRef = useRef<number | undefined>(undefined);

  const startTimer = () => {
    secondsRef.current = window.setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    startTime = Date.now();
    interval = setInterval(() => {
      setMilliseconds(Date.now() - startTime);
    });
  };

  const stopTimer = () => {
    clearInterval(secondsRef.current);
    secondsRef.current = 0;

    clearInterval(interval);
  }

  useEffect(() => {
    gameStatus === EnumGameStatus.in_progress && startTimer();
    gameStatus === EnumGameStatus.lose && stopTimer();

    if (gameStatus === EnumGameStatus.win) {
      stopTimer();

      dispatch(setDuration(milliseconds));
    }
  }, [gameStatus]);

  return (
    <>
      <Typography>Duration: {seconds}s</Typography>
    </>
  );
};

export default Counter;
