import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { HighScoreResponse, SendScoringData } from "../types/types";

type HighScoreState = {
  data: HighScoreResponse[] | null;
  loading: boolean;
  error: string | undefined;
};

const initialState: HighScoreState = {
  data: null,
  loading: false,
  error: undefined,
};

export const fetchHighScoreData = createAsyncThunk(
  "highScore/fetchHighScoreData",
  async () => {
    const res = await axios.get(
      "https://my-json-server.typicode.com/stanko-ingemark/hang_the_wise_man_frontend_task/highscores"
    );

    return res.data;
  }
);

export const sendScoringData = createAsyncThunk(
  "highScore/sendScoringData",
  async (data: SendScoringData) => {
    const res = await axios.post(
      "https://my-json-server.typicode.com/stanko-ingemark/hang_the_wise_man_frontend_task/highscores",
      data
    );

    return res.data;
  }
);

export const scoreSlice = createSlice({
  name: "score",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHighScoreData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchHighScoreData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchHighScoreData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default scoreSlice.reducer;
