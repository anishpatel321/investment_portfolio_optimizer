import { createSlice } from '@reduxjs/toolkit';

export const outputSlice = createSlice({
  name: 'outputs',
 
 
  initialState: {
    results : null,
    pie_data: null, 
    MEF_df: null,
  },
  
  reducers: {
    setData: (state, action) => {
      state.results = action.payload;





    },

    formatPieData: (state, action) => {
      state.pie_data = action.payload;
    }

  },


});

// define the actions
export const {
  setData,
  formatPieData
} = outputSlice.actions;

export default outputSlice.reducer;