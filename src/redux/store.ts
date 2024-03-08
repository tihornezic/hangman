import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./gameSlice";
import quoteReducer from "./quoteSlice";
import highScoreReducer from "./highScoreSlice";

const store = configureStore({
  reducer: {
    game: gameReducer,
    quote: quoteReducer,
    highScores: highScoreReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
