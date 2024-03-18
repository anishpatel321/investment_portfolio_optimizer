import { configureStore } from '@reduxjs/toolkit'
import tickersReducer from "./tickers";

export const store = configureStore({
  reducer: {
    tickers: tickersReducer

  }
});