import { createSlice } from "@reduxjs/toolkit";
import {sortStrings} from '../utilityFunctions/sortStrings.js'

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
        },
        sortBankTransactions: (state, action) => {
            switch(action.payload) {
                case "nameAtoZ":
                  state.transactions = state.transactions.sort((a, b) => sortStrings(a.description, b.description))
                  break;
                case "nameZtoA":
                  state.transactions = state.transactions.sort((a, b) => sortStrings(a.description, b.description)).reverse()
                  break;
                case "newToOld":
                    state.transactions = state.transactions.sort((a, b) => sortStrings(a.transaction_date, b.transaction_date)).reverse()
                    break;
                case "oldToNew":
                    state.transactions = state.transactions.sort((a, b) => sortStrings(a.transaction_date, b.transaction_date))
                    break;
                case "amountLtoH":
                  state.transactions = state.transactions.sort((a, b) => a.amount - b.amount)
                  break;
                case "amountHtoL":
                  state.transactions = state.transactions.sort((a, b) => b.amount - a.amount)
                  break;
                default:
                  break;
            }
        }
    }
})

export const {setBankTransactions, addBankTransaction, updateBankTransaction, sortBankTransactions} = bankTransactionSlice.actions

export default bankTransactionSlice.reducer