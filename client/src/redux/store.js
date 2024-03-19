import { configureStore } from '@reduxjs/toolkit'
import inputsReducer from "./inputs";

export const store = configureStore({
  reducer: {
    inputs: inputsReducer

  }
});