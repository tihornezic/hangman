import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "./store";

type PlayerState = {
  playerName: string;
};

const initialState: PlayerState = {
  playerName: "",
};

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setPlayerName: (state, action: PayloadAction<string>) => {
      state.playerName = action.payload;
    },
  },
});

export const { setPlayerName } = playerSlice.actions;

export const setPlayerNameAsync = (data: string) => (dispatch: AppDispatch) => {
  return dispatch(setPlayerName(data));
};

export const selectPlayer = (state: RootState) => state.player.playerName;

export default playerSlice.reducer;
