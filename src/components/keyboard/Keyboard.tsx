import { Button, Stack, Typography } from "@mui/material";
import { Dispatch, useEffect } from "react";
import { EnumGameStatus } from "../../types/types";

const keyboardLayout = [
  ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m"],
  ["n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
];

type KeyboardProps = {
  setUserInput: Dispatch<React.SetStateAction<string>>;
  setTurn: Dispatch<React.SetStateAction<number>>;
  gameStatus: EnumGameStatus;
  setGameStatus: Dispatch<React.SetStateAction<EnumGameStatus>>;
  usedCharacters: string[];
};

const Keyboard = ({
  setUserInput,
  setTurn,
  gameStatus,
  setGameStatus,
  usedCharacters,
}: KeyboardProps) => {
  const handleType = (e: KeyboardEvent) => {
    const lowerCasedLetter = e.key.toLocaleLowerCase();
    const isLetter = lowerCasedLetter.match(/^[a-z]{1}$/) !== null;

    if (isLetter) {
      setGameStatus(EnumGameStatus.in_progress);

      if (usedCharacters.includes(lowerCasedLetter)) return;

      setUserInput((prevUserInput) => {
        // if letter already exists
        if (prevUserInput.includes(lowerCasedLetter)) {
          return prevUserInput;
        }

        // if successful turn
        setTurn((prevTurn: number) => prevTurn + 1);
        return prevUserInput + lowerCasedLetter;
      });
    }
  };

  useEffect(() => {
    if (gameStatus === EnumGameStatus.win || gameStatus === EnumGameStatus.lose)
      return;

    window.addEventListener("keydown", handleType);

    return () => window.removeEventListener("keydown", handleType);
  }, [gameStatus]);

  return (
    <Stack spacing={1} sx={{ alignItems: "center" }}>
      {keyboardLayout.map((row, rowIndex) => (
        <Stack
          key={rowIndex}
          spacing={1}
          direction="row"
          justifyContent="center"
          rowGap={"8px"}
          sx={{ flexWrap: "wrap" }}
        >
          {row.map((key, keyIndex) => {
            const isUsedCharacters = usedCharacters.includes(key);
            const isWinOrLose =
              gameStatus === EnumGameStatus.lose ||
              gameStatus === EnumGameStatus.win;

            return (
              <Button
                disabled={isWinOrLose}
                key={keyIndex}
                sx={{
                  minWidth: "initial",
                  width: 40,
                  height: 40,
                  bgcolor: isUsedCharacters ? "grey.200" : "primary.main",
                  pointerEvents: isUsedCharacters ? "none" : "initial",
                  "&:hover": {
                    bgcolor: isUsedCharacters ? "grey.200" : "#313948",
                  },
                  color: "#fff !important",
                }}
                onClick={() => {
                  if (isWinOrLose) return;

                  if (gameStatus === EnumGameStatus.not_started)
                    setGameStatus(EnumGameStatus.in_progress);

                  setUserInput((prevUserInput) => {
                    // if successful turn
                    setTurn((prevTurn: number) => prevTurn + 1);
                    return prevUserInput + key;
                  });
                }}
              >
                <Typography fontWeight="600">{key}</Typography>
              </Button>
            );
          })}
        </Stack>
      ))}
    </Stack>
  );
};

export default Keyboard;
