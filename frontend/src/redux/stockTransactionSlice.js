import { createSlice } from "@reduxjs/toolkit";

export const stockTransactionSlice = createSlice({
    name: 'stock_transactions',
    initialState: {
        transactions: null
    },
    reducers: {
        setStockTransactions: (state, action) => {
            state.transactions = action.payload
        },
        addStockTransaction: (state, action) => {
            state.transactions = [...state.transactions, action.payload]
        },
        updateStockTransaction: (state, action) => {
            state.transactions = state.transactions.map(transaction => transaction.id === action.payload.id ? action.payload : transaction)
        }
    }
})

export const {setStockTransactions, addStockTransaction, updateStockTransaction} = stockTransactionSlice.actions

export default stockTransactionSlice.reducer