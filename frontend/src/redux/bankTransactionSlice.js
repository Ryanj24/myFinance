import { createSlice } from "@reduxjs/toolkit";

export const bankTransactionSlice = createSlice({
    name: 'bank_transactions',
    initialState: {
        transactions: null
    },
    reducers: {
        setBankTransactions: (state, action) => {
            state.transactions = action.payload
        },
        addBankTransaction: (state, action) => {
            state.transactions = [...state.transactions, action.payload]
        },
        updateBankTransaction: (state, action) => {
            state.transactions = state.transactions.map(transaction => transaction.id === action.payload.id ? action.payload : transaction)
        }
    }
})

export const {setBankTransactions, addBankTransaction, updateBankTransaction} = bankTransactionSlice.actions

export default bankTransactionSlice.reducer