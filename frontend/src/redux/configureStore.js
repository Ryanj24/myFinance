import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice.js'

export const reduxStore = configureStore({
  reducer: {
    user: userReducer
  },
  devTools: window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
})