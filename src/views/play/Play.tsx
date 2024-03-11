import { Button, Stack, Typography } from "@mui/material";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useEffect, useMemo } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { fetchQuoteData } from "../../redux/quoteSlice";
import GuessFieldsBoard from "../../components/guess-fields-board/GuessFieldsBoard";
import Keyboard from "../../components/keyboard/Keyboard";
import { EnumGameStatus } from "../../types/types";
import {
  calculateArrayOfWordsArrayOfChars,
  findUniqueCharacters,
} from "../../helpers/helpers";
import GameStats from "../../components/game-stats/GameStats";
import Hangman from "../../components/hangman/Hangman";
import { clearDuration, resetGameId } from "../../redux/gameSlice";
import Modal from "../../components/modal/Modal";
import Congratulations from "../../components/congratulations/Congratulations";
import { usePlay } from "../../hooks/usePlay";

const Play = () => {
  const dispatch = useAppDispatch();
  const { data, loading } = useAppSelector((state) => state.quote);

  const quoteData = data && data;
  const quoteContent = quoteData && quoteData.content;

  const hangmanArrayOfWordsArrayOfChars = useMemo(
    () => calculateArrayOfWordsArrayOfChars(quoteContent ?? ""),
    [quoteContent]
  );

  const uniqueCharacters = useMemo(
    () => findUniqueCharacters(quoteContent ?? ""),
    [quoteContent]
  );

  const {
    userName,
    userInput,
    setUserInput,
    setTurn,
    corrects,
    mistakes,
    gameStatus,
    setGameStatus,
    isModalOpen,
    setIsModalOpen,
  } = usePlay(uniqueCharacters, quoteData);

  useEffect(() => {
    // fetch the quote data
    const promise = dispatch(fetchQuoteData());

    return () => {
      promise.abort();
      dispatch(clearDuration());
    };
  }, [dispatch]);

  return (
    <>
      <Stack
        spacing={6}
        sx={{ maxWidth: { xs: "95%", sm: "60%" }, alignItems: "center", py: 5 }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ width: { xs: "90%", sm: "70%" } }}
        >
          <GameStats
            gameStatus={gameStatus}
            mistakes={mistakes}
            userName={userName}
          />

          <Button
            onClick={() => {
              dispatch(resetGameId());
              dispatch(clearDuration());
            }}
            variant="contained"
            sx={{ m: 0, right: 0 }}
          >
            {gameStatus === EnumGameStatus.lose ? "Try again" : "Restart"}
          </Button>
        </Stack>

        <Hangman gameStatus={gameStatus} mistakes={mistakes} />

        {loading && <Typography variant="h5">Loading...</Typography>}

        {hangmanArrayOfWordsArrayOfChars && (
          <GuessFieldsBoard
            hangmanArrayOfWordsArrayOfChars={hangmanArrayOfWordsArrayOfChars}
            userInput={userInput}
            gameStatus={gameStatus}
          />
        )}

        <Keyboard
          setUserInput={setUserInput}
          setTurn={setTurn}
          gameStatus={gameStatus}
          setGameStatus={setGameStatus}
          usedCharacters={[...mistakes, ...corrects]}
        />
      </Stack>

      <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
        <Congratulations
          mistakes={mistakes.length}
          uniqueCharacters={uniqueCharacters}
        />
      </Modal>
    </>
  );
};

export default Play;
