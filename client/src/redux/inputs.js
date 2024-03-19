import { createSlice } from '@reduxjs/toolkit';

export const inputSlice = createSlice({
  name: 'inputs',
  initialState: {
    tickers: [], // initialize array for storing tickers
    riskThreshold: 0.05, // default risk threshold
    lookBackDate: new Date(), // default lookback date
    minAllocationBound: 0.1, // default minimum allocation bound
    maxAllocationBound: 0.9, // default maximum allocation bound
    investmentAmount: 1000, // default investment amount
    package: null, // initialize package property as null
  },
  reducers: {
    addTicker: (state, action) => {
      const newTicker = action.payload;
      // check if ticker is in the list
      if (!state.tickers.includes(newTicker)) {
        state.tickers.push(newTicker); // add ticker to array
      }
    },
    removeTicker: (state, action) => {
      const tickerToRemove = action.payload;
      // find ticker to remove
      state.tickers = state.tickers.filter(ticker => ticker !== tickerToRemove);
    },
    setRisk: (state, action) => {
      state.riskThreshold = action.payload;
    },
    setLookBack: (state, action) => {
      state.lookBackDate = action.payload;
    },
    setMinAllocation: (state, action) => {
      state.minAllocationBound = action.payload;
    },
    setMaxAllocation: (state, action) => {
      state.maxAllocationBound = action.payload;
    },
    setInvestment: (state, action) => {
      state.investmentAmount = action.payload;
    },
    packageData: (state) => {
      // Package all the data into a single object and store it in 'package'
      state.package = {
        tickers: state.tickers,
        riskThreshold: state.riskThreshold,
        lookBackDate: state.lookBackDate,
        minAllocationBound: state.minAllocationBound,
        maxAllocationBound: state.maxAllocationBound,
        investmentAmount: state.investmentAmount,
      };
    },
  },
});

// define the actions
export const {
  addTicker,
  removeTicker,
  setRisk,
  setLookBack,
  setMinAllocation,
  setMaxAllocation,
  setInvestment,
  packageData,
} = inputSlice.actions;

export default inputSlice.reducer;