import { createSlice } from "@reduxjs/toolkit";
import { sortStrings } from "../utilityFunctions/sortStrings";

export const accountSlice = createSlice({
    name: 'accounts',
    initialState: {
        accounts: null
    },
    reducers: {
        setAccounts: (state, action) => {
            state.accounts = action.payload
        },
        addAccount: (state, action) => {
            state.accounts = [...state.accounts, action.payload]
        },
        updateAccount: (state, action) => {
            state.accounts = state.accounts.map(account => account.id === action.payload.id ? action.payload : account)
        },
        incrementAccountBalance: (state, action) => {
            state.accounts = state.accounts.map(account => account.id === action.payload.account_id ? {...account, balance: parseFloat(account.balance) + parseFloat(action.payload.amount)} : account)
        },
        decrementAccountBalance: (state, action) => {
            state.accounts = state.accounts.map(account => account.id === action.payload.account_id ? {...account, balance: parseFloat(account.balance) - parseFloat(action.payload.amount)} : account)
        },
        deleteAccount: (state, action) => {
            state.accounts = state.accounts.filter(account => account.id != action.payload.id)
        },
        sortAccounts: (state, action) => {
            switch(action.payload) {
                case "nameAtoZ":
                  state.accounts = state.accounts.sort((a, b) => sortStrings(a.account_name, b.account_name))
                  break;
                case "nameZtoA":
                  state.accounts = state.accounts.sort((a, b) => sortStrings(a.account_name, b.account_name)).reverse()
                  break;
                case "balanceLtoH":
                  state.accounts = state.accounts.sort((a, b) => a.balance - b.balance)
                  break;
                case "balanceHtoL":
                  state.accounts = state.accounts.sort((a, b) => b.balance - a.balance)
                  break;
                default:
                  break;
            }
        }
    }
})

export const {setAccounts, addAccount, updateAccount, incrementAccountBalance, decrementAccountBalance, deleteAccount, sortAccounts} = accountSlice.actions

export default accountSlice.reducer