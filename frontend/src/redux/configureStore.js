import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice.js'
import accountReducer from './accountSlice.js'
import portfolioReducer from './portfolioSlice.js'
import bankTransactionReducer from './bankTransactionSlice.js'
import stockTransactionReducer from './stockTransactionSlice.js'
import goalReducer from './goalSlice.js'
import budgetReducer from './budgetSlice.js'

export const reduxStore = configureStore({
  reducer: {
    user: userReducer,
    accounts: accountReducer,
    portfolios: portfolioReducer,
    bankTransactions: bankTransactionReducer,
    stockTransactions: stockTransactionReducer,
    goals: goalReducer,
    budgets: budgetReducer
  },
})