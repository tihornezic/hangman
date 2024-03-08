import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./gameSlice";
import quoteReducer from "./quoteSlice";
import scoreReducer from "./scoreSlice";

const store = configureStore({
  reducer: {
    game: gameReducer,
    quote: quoteReducer,
    highScores: scoreReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
