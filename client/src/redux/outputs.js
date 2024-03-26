import { createSlice } from '@reduxjs/toolkit';



export const outputSlice = createSlice({
  name: 'outputs',

  initialState: {
    results: null,
    df_adj_close: null,
    risk_free_rate: null,
    log_returns: null,
    df_cov_matrix: null,
    df_cor_matrix : {
      
    MSFT: { MSFT: 1.0, AAPL: 0.8, AMZN: 0.5, NVDA: 0.3, AVGO: 0.2 },
    AAPL: { MSFT: 0.8, AAPL: 1.0, AMZN: 0.4, NVDA: 0.3, AVGO: 0.2 },
    AMZN: { MSFT: 0.5, AAPL: 0.4, AMZN: 1.0, NVDA: 0.2, AVGO: 0.1 },
    NVDA: { MSFT: 0.3, AAPL: 0.3, AMZN: 0.2, NVDA: 1.0, AVGO: 0.5 },
    AVGO: { MSFT: 0.2, AAPL: 0.2, AMZN: 0.1, NVDA: 0.5, AVGO: 1.0 }
    
  },
  
    df_max_sharpe_below_threshold_generated_portfolio: {
      'Ticker': {
        0: 'MSFT',
        1: 'AAPL',
        2: 'AMZN',
        3: 'NVDA',
        4: 'AVGO'
      },
      'Optimal Weights': {
        0: 0.165788,
        1: 0.048821,
        2: 0.009022,
        3: 0.572737,
        4: 0.203633
      }
    },


    threshold_state: null,
    df_historical: null,
    df_historical_trendline: null,
    df_forecast_trendline: null,
    df_generated_portfolios: null,
    df_optimal_theoretical: null,
    df_optimal_generated: null,
    df_optimal_valid: null,
    df_MEF: {
      'Volatility': {
        0: 0.378981,
        1: 0.3562235249,
        2: 0.3562235249,
        3: 0.3615221217,
        4: 0.3789815938
      },
      'Returns': {
        0: -0.3351217079,
        1: -0.2962401502,
        2: -0.2573585925,
        3: 0.007036,
        4: 0.0225886231
      }
    },
    df_CML:  {
      'Volatility': {
        0: 0.378981,
        1: 0.3562235249,
        2: 0.3562235249,
        3: 0.3615221217,
        4: 0.3789815938
      },
      'Returns': {
        0: -0.4351217079,
        1: -0.5962401502,
        2: -0.45573585925,
        3: 0.017036,
        4: 0.6225886231
      }
    },
    df_CAL: {
      'Volatility': {
        0: 0.578981,
        1: 0.2562235249,
        2: 0.1562235249,
        3: 0.7615221217,
        4: 0.2789815938
      },
      'Returns': {
        0: -0.3351217079,
        1: -0.2962401502,
        2: -0.2573585925,
        3: 0.007036,
        4: 0.0225886231
      }
    },
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