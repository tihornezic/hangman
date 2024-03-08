import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { HighScoreResponse } from "../types/types";

type HighScoreState = {
  data: HighScoreResponse[] | null;
  loading: boolean;
  error: any;
};

const initialState: HighScoreState = {
  data: null,
  loading: false,
  error: null,
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
  async (data: any) => {
    console.log(data)

    const res = await axios.post(
      "https://my-json-server.typicode.com/stanko-ingemark/hang_the_wise_man_frontend_task/highscores",
      data
    );

    return res.data;
  }
);

export const quoteSlice = createSlice({
  name: "highScores",
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

export default quoteSlice.reducer;
