import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { QuotableResponse } from "../types/types";

type QuoteState = {
  data: QuotableResponse | null;
  loading: boolean;
  error: any;
};

const initialState: QuoteState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchQuoteData = createAsyncThunk(
  "quote/fetchQuoteData",
  async () => {
    const res = await axios.get("https://api.quotable.io/random");

    return res.data;
  }
);

export const quoteSlice = createSlice({
  name: "quote",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuoteData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchQuoteData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchQuoteData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default quoteSlice.reducer;
