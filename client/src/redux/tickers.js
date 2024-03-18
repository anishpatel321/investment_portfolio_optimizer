import { createSlice } from '@reduxjs/toolkit';

export const tickerSlice = createSlice({
  name: 'tickers',
  initialState: {
    tickers: [], //initialize array for storing tickers
  },
  reducers: {
    addTicker: (state, action) => {
      const newTicker = action.payload;
      //check if ticker is in the list
      if (!state.tickers.includes(newTicker)) {
        state.tickers.push(newTicker); //add ticker to array
      }
    },
    removeTicker: (state, action) => {
      const tickerToRemove = action.payload;
      //find ticker to remove
      state.tickers = state.tickers.filter(ticker => ticker !== tickerToRemove);
    },
  },
});

//define the actions
export const { addTicker, removeTicker } = tickerSlice.actions;

export default tickerSlice.reducer;