import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "./store";
import { v4 as uuidv4 } from "uuid";

type GameState = {
  userName: string;
  gameId: string | null;
  //
  quoteId: string;
  length: number;
  uniqueCharacters: number;
  //
  duration: number;
  // errors: number;
  errors: string[];
};

const initialState: GameState = {
  userName: "",
  gameId: null,
  //
  quoteId: "",
  length: 0,
  uniqueCharacters: 0,
  //
  duration: 0,
  // errors: 0,
  errors: [],
  //
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setUserName: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
      state.gameId = uuidv4();
    },
    resetGameId: (state) => {
      state.gameId = uuidv4();
    },
    setGameData: (state, action: PayloadAction<any>) => {
      state.quoteId = action.payload.quoteId;
      state.length = action.payload.length;
      state.uniqueCharacters = action.payload.uniqueCharacters;
    },
    setDuration: (state, action: PayloadAction<any>) => {
      console.log(action.payload);
      state.duration = action.payload;
    },
    setErrors: (state, action: PayloadAction<any>) => {
      state.errors.push(action.payload);
    },
    clearErrors: (state) => {
      state.errors = [];
    },
  },
});

export const {
  setUserName,
  resetGameId,
  setGameData,
  setDuration,
  setErrors,
  clearErrors,
} = gameSlice.actions;

export const setPlayerNameAsync = (data: string) => (dispatch: AppDispatch) => {
  return dispatch(setUserName(data));
};

export const setDurationAsync = (data: number) => (dispatch: AppDispatch) => {
  return dispatch(setDuration(data));
};

export const selectPlayer = (state: RootState) => state.game.userName;

export default gameSlice.reducer;
