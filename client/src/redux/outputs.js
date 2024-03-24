import { createSlice } from '@reduxjs/toolkit';



export const outputSlice = createSlice({
  name: 'outputs',

  initialState: {
    results: null,
    df_adj_close: null,
    risk_free_rate: null,
    log_returns: null,
    df_cov_matrix: null,
    df_cor_matrix: {
      'MSFT': [1.0, 0.8, 0.5, 0.3, 1.0],
      'AAPL': [0.8, 1.0, 0.4, 0.3, 0.2],
      'AMZN': [0.5, 0.4, 1.0, 0.2, 0.1],
      'NVDA': [0.3, 0.3, 0.2, 1.0, 0.5],
      'AVGO': [1.0, 0.2, 0.1, 0.5, 1.0]
    },
    df_max_sharpe_below_threshold_generated_portfolio: {
      'Ticker': ['MSFT', 'AAPL', 'AMZN', 'NVDA', 'AVGO'],
      'Optimal Weights': [16.5788, 4.8821, 0.9022, 57.2737, 20.3633]
    },
    threshold_state: null,
    df_historical: null,
    df_historical_trendline: null,
    df_forecast_trendline: null,
    df_generated_portfolios: null,
    df_optimal_theoretical: null,
    df_optimal_generated: null,
    df_optimal_valid: null,
    df_MEF: null,
    df_CML: null,
    df_CAL: null,
    df_risk_threshold: null,
    df_risk_free_rate: null
    // for now this is all from algo
  },


  reducers: {
    setData: (state, action) => {
      state.results = action.payload;

      // Parse JSON strings to objects
      state.df_adj_close = JSON.parse(action.payload.df_adj_close);
      state.log_returns = JSON.parse(action.payload.log_returns);
      state.df_cov_matrix = JSON.parse(action.payload.df_cov_matrix);
      state.df_cor_matrix = JSON.parse(action.payload.df_cor_matrix);
      state.df_max_sharpe_below_threshold_generated_portfolio = JSON.parse(action.payload.df_max_sharpe_below_threshold_generated_portfolio);
      state.df_historical = JSON.parse(action.payload.df_historical);
      state.df_historical_trendline = JSON.parse(action.payload.df_historical_trendline);
      state.df_forecast_trendline = JSON.parse(action.payload.df_forecast_trendline);
      state.df_generated_portfolios = JSON.parse(action.payload.df_generated_portfolios);
      state.df_optimal_theoretical = JSON.parse(action.payload.df_optimal_theoretical);
      state.df_optimal_generated = JSON.parse(action.payload.df_optimal_generated);
      state.df_optimal_valid = JSON.parse(action.payload.df_optimal_valid);
      state.df_MEF = JSON.parse(action.payload.df_MEF);
      state.df_CML = JSON.parse(action.payload.df_CML);
      state.df_CAL = JSON.parse(action.payload.df_CAL);
      state.df_risk_threshold = JSON.parse(action.payload.df_risk_threshold);
      state.df_risk_free_rate = JSON.parse(action.payload.df_risk_free_rate);

      // Assign numerical values values directly
      state.risk_free_rate = action.payload.risk_free_rate;
      state.threshold_state = action.payload.threshold_state;
      
    },



  },


});

// define the actions
export const { setData } = outputSlice.actions;

export default outputSlice.reducer;