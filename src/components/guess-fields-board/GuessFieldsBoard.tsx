import { Stack, SxProps, Theme } from "@mui/material";
import { EnumGameStatus } from "../../types/types";
import { specialCharactersRegex } from "../../helpers/helpers";
import EmptyField from "./components/EmptyField";
import RevealedField from "./components/RevealedField";

type GuessFieldsBoardProps = {
  hangmanArrayOfWordsArrayOfChars: string[][];
  userInput: string;
  gameStatus: EnumGameStatus;
  sx?: SxProps<Theme>;
};

const GuessFieldsBoard = ({
  hangmanArrayOfWordsArrayOfChars,
  userInput,
  gameStatus,
  sx,
}: GuessFieldsBoardProps) => {
  const drawCharacters = (character: string) => {
    // if (gameStatus === EnumGameStatus.not_started) {
    //   return <EmptyField />;
    // }

    if (
      gameStatus === EnumGameStatus.lose ||
      gameStatus === EnumGameStatus.win
    ) {
      return (
        <RevealedField
          character={character}
          sx={{
            color:
              gameStatus === EnumGameStatus.lose
                ? "error.main"
                : "success.main",
          }}
        />
      );
    }

    const correctGuess = userInput.includes(character);
    const isSpecialChar = specialCharactersRegex.test(character);

    if (!(isSpecialChar || correctGuess)) {
      return <EmptyField />;
    }

    return <RevealedField character={character} />;
  };

  return (
    <Stack
      spacing={3}
      direction="row"
      flexWrap="wrap"
      justifyContent="center"
      rowGap="25px"
      alignItems="baseline"
      sx={{ ...sx }}
    >
      {/* words */}
      {hangmanArrayOfWordsArrayOfChars &&
        hangmanArrayOfWordsArrayOfChars.map((arrayOfWords) => (
          // char
          <Stack spacing={0.5} direction="row" alignItems="baseline">
            {arrayOfWords.map((character) => drawCharacters(character))}
          </Stack>
        ))}
    </Stack>
  );
};

export default GuessFieldsBoard;
