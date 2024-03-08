import { Button, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { EnumGameStatus } from "../../types/types";

const keyboardLayout = [
  ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m"],
  ["n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
];

const Keyboard = ({
  setUserInput,
  setTurn,
  gameStatus,
  setGameStatus,
  usedCharacters,
}: any) => {
  // console.log("usedCharacters", usedCharacters);

  const handleType = (e: KeyboardEvent) => {
    const lowerCasedLetter = e.key.toLocaleLowerCase();
    const isLetter = lowerCasedLetter.match(/^[a-z]{1}$/) !== null;

    if (isLetter) {
      // setGameInProgress(true);
      setGameStatus(EnumGameStatus.in_progress);

      if (usedCharacters.includes(lowerCasedLetter)) return;

      setUserInput((prevGuess: any) => {
        // if letter already exists
        if (prevGuess.includes(lowerCasedLetter)) {
          return prevGuess;
        }

        // if successful turn
        setTurn((prevTurn: number) => prevTurn + 1);
        return prevGuess + lowerCasedLetter;
      });
    }
  };

  useEffect(() => {
    if (gameStatus === EnumGameStatus.win || gameStatus === EnumGameStatus.lose)
      return;

    window.addEventListener("keydown", handleType);

    return () => window.removeEventListener("keydown", handleType);
  }, [gameStatus]);

  // console.log(usedCharacters);

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

            // console.log(isUsedCharacters);

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

                  setUserInput((prevGuess: any) => {
                    // if successful turn
                    setTurn((prevTurn: number) => prevTurn + 1);
                    return prevGuess + key;
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
