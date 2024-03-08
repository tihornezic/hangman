import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "./store";
import { v4 as uuidv4 } from "uuid";

type GameState = {
  userName: string;
  gameId: string | null;
  duration: number;
};

const initialState: GameState = {
  userName: "",
  gameId: null,
  duration: 0,
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
    setDuration: (state, action: PayloadAction<number>) => {
      state.duration = action.payload;
    },
    clearDuration: (state) => {
      state.duration = initialState.duration;
    },
    clearUserName: (state) => {
      state.userName = initialState.userName;
    },
  },
});

export const {
  setUserName,
  resetGameId,
  setDuration,
  clearDuration,
  clearUserName,
} = gameSlice.actions;

export const setPlayerNameAsync = (data: string) => (dispatch: AppDispatch) => {
  return dispatch(setUserName(data));
};

export const setDurationAsync = (data: number) => (dispatch: AppDispatch) => {
  return dispatch(setDuration(data));
};

export const selectPlayer = (state: RootState) => state.game.userName;

export default gameSlice.reducer;
