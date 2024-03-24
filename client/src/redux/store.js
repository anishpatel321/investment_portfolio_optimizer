
import { configureStore } from '@reduxjs/toolkit';
import inputsReducer from "./inputs"
import outputsReducer from "./outputs"


export const store = configureStore({
    reducer: {
      inputs: inputsReducer,
      outputs: outputsReducer  
    }
  });
