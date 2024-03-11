import { useEffect, useState } from "react";
import { EnumGameStatus, QuotableResponse } from "../types/types";
import { doStringsHaveSameCharacters } from "../helpers/helpers";
import { useAppDispatch } from "./useAppDispatch";
import { sendScoringData } from "../redux/scoreSlice";
import { useAppSelector } from "./useAppSelector";

export const usePlay = (
  uniqueCharacters: string | null,
  quoteData: QuotableResponse | null
) => {
  const dispatch = useAppDispatch();
  const { userName, duration } = useAppSelector((state) => state.game);

  const [turn, setTurn] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [mistakes, setMistakes] = useState<string[]>([]);
  const [corrects, setCorrects] = useState<string[]>([]);
  const [gameStatus, setGameStatus] = useState<EnumGameStatus>(
    EnumGameStatus.not_started
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (uniqueCharacters) {
      // if win
      if (doStringsHaveSameCharacters(uniqueCharacters, corrects)) {
        setGameStatus(EnumGameStatus.win);

        const sendData = async () => {
          if (duration !== 0 && quoteData) {
            try {
              await dispatch(
                sendScoringData({
                  quoteId: quoteData._id,
                  length: quoteData.length,
                  uniqueCharacters: uniqueCharacters.length,
                  userName: userName,
                  errors: mistakes.length,
                  duration: duration,
                })
              );

              setTimeout(() => setIsModalOpen(true), 1000);
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
  }, [uniqueCharacters, corrects, mistakes, duration, quoteData, userName]);

  useEffect(() => {
    if (uniqueCharacters) {
      if (gameStatus === EnumGameStatus.in_progress) {
        const currentTypedCharacter = userInput[turn - 1];

        if (!uniqueCharacters.includes(currentTypedCharacter)) {
          // wrong character already there
          if (mistakes.includes(currentTypedCharacter)) {
            return;
          }

          setMistakes((prevMistakes) => [
            ...prevMistakes,
            currentTypedCharacter,
          ]);

          return;
        }

        setCorrects((prevCorrects) => [...prevCorrects, currentTypedCharacter]);
      }
    }
  }, [gameStatus, userInput, turn, uniqueCharacters, mistakes]);

  return {
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
  };
};
