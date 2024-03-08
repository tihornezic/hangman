import { Button, Stack } from "@mui/material";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { fetchQuoteData } from "../../redux/quoteSlice";
import { useNavigate } from "react-router-dom";
import GuessFieldsBoard from "../../components/guess-fields-board/GuessFieldsBoard";
import Keyboard from "../../components/keyboard/Keyboard";
import { EnumGameStatus } from "../../types/types";
import {
  calculateArrayOfWordsArrayOfChars,
  doArraysHaveSameLetters,
  findUniqueCharacters,
} from "../../helpers/helpers";
import GameStats from "../../components/game-stats/GameStats";
import Hangman from "../../components/hangman/Hangman";
import {
  clearDuration,
  clearErrors,
  resetGameId,
  setErrors,
  setGameData,
} from "../../redux/gameSlice";
import { sendScoringData } from "../../redux/highScoreSlice";
import Modal from "../../components/modal/Modal";
import Congratulations from "../../components/congratulations/Congratulations";

const Play = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { userName, ...rest } = useAppSelector((state) => state.game);
  const { errors } = useAppSelector((state) => state.game);

  const { data, loading, error } = useAppSelector((state) => state.quote);

  //
  const [turn, setTurn] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [mistakes, setMistakes] = useState<string[]>([]);
  const [corrects, setCorrects] = useState<string[]>([]);
  const [gameStatus, setGameStatus] = useState<EnumGameStatus>(
    EnumGameStatus.not_started
  );

  //
  const [isModalOpen, setIsModalOpen] = useState(false);

  const quoteData = data && data;
  const quoteContent = quoteData && quoteData.content;

  const hangmanArrayOfWordsArrayOfChars =
    quoteContent && calculateArrayOfWordsArrayOfChars(quoteContent);

  const uniqueCharacters =
    quoteContent && findUniqueCharacters(quoteContent as string);

  useEffect(() => {
    if (quoteData && uniqueCharacters) {
      dispatch(
        setGameData({
          quoteId: quoteData._id,
          length: quoteData.length,
          uniqueCharacters: uniqueCharacters.length,
        })
      );
    }
  }, [dispatch, quoteData, uniqueCharacters]);

  useEffect(() => {
    if (uniqueCharacters) {
      // if win
      if (doArraysHaveSameLetters(uniqueCharacters, corrects)) {
        setGameStatus(EnumGameStatus.win);
        setTimeout(() => setIsModalOpen(true), 1500);

        const sendData = async () => {
          if (rest.duration !== 0) {
            try {
              await dispatch(
                sendScoringData({
                  quoteId: rest.quoteId,
                  length: rest.length,
                  uniqueCharacters: rest.uniqueCharacters,
                  userName: userName,
                  errors: rest.errors,
                  duration: rest.duration * 1000,
                })
              );
            } catch (err) {
              console.log(err);
            }
          }
        };

        sendData();
      }
    }

    // if loss
    if (mistakes.length === 6) setGameStatus(EnumGameStatus.lose);
  }, [uniqueCharacters, corrects, mistakes, rest.duration]);

  useEffect(() => {
    if (uniqueCharacters) {
      if (gameStatus === EnumGameStatus.in_progress) {
        if (!uniqueCharacters?.includes(userInput[turn - 1])) {
          // wrong character already there
          if (mistakes.includes(userInput[turn - 1])) {
            return;
          }

          setMistakes((prevMistakes) => [...prevMistakes, userInput[turn - 1]]);
          dispatch(setErrors(userInput[turn - 1]));

          return;
        }

        setCorrects((prevCorrects) => [...prevCorrects, userInput[turn - 1]]);
      }
    }
  }, [gameStatus, userInput, turn, uniqueCharacters, mistakes]);

  useEffect(() => {
    // fetch the quote data
    const promise = dispatch(fetchQuoteData());

    return () => {
      promise.abort();
    };
  }, [dispatch]);

  return (
    <>
      <Stack
        spacing={6}
        sx={{ maxWidth: { xs: "95%", sm: "60%" }, alignItems: "center" }}
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
              dispatch(clearErrors());
              dispatch(clearDuration());
            }}
            variant="contained"
            sx={{ m: 0, right: 0 }}
          >
            {gameStatus === EnumGameStatus.lose ? "Try again" : "Restart"}
          </Button>
        </Stack>

        <Hangman gameStatus={gameStatus} mistakes={mistakes} />

        {/* {loading && <Typography variant="h4">loading</Typography>} */}

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
        <Congratulations />
      </Modal>
    </>
  );
};

export default Play;
