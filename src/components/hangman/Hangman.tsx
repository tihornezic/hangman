import { Box } from "@mui/material";
import zeroErrors from "../../assets/hangman/0-errors.svg";
import oneError from "../../assets/hangman/1-errors.svg";
import twoErrors from "../../assets/hangman/2-errors.svg";
import threeErrors from "../../assets/hangman/3-errors.svg";
import fourErrors from "../../assets/hangman/4-errors.svg";
import fiveErrors from "../../assets/hangman/5-errors.svg";
import sixErrors from "../../assets/hangman/6-errors.svg";
import win from "../../assets/hangman/win.svg";
import { EnumGameStatus } from "../../types/types";

const hangmanSvgs = [
  { id: 1, src: zeroErrors },
  { id: 2, src: oneError },
  { id: 3, src: twoErrors },
  { id: 4, src: threeErrors },
  { id: 5, src: fourErrors },
  { id: 6, src: fiveErrors },
  { id: 7, src: sixErrors },
];

type HangmanProps = {
  gameStatus: EnumGameStatus;
  mistakes: string[];
};

const Hangman = ({ gameStatus, mistakes }: HangmanProps) => {
  return (
    <Box
      component="img"
      src={
        gameStatus === EnumGameStatus.win
          ? win
          : hangmanSvgs[mistakes.length].src
      }
      sx={{ width: { xs: "50%", sm: "40%", md: "20%" }, alignSelf: "center" }}
    />
  );
};

export default Hangman;
