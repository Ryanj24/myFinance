import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice.js'

export const reduxStore = configureStore({
  reducer: {
    user: userReducer
  },
})