import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice.js'

export default reduxStore({
  reducer: {
    user: userReducer
  },
})