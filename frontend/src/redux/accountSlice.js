import { createSlice } from "@reduxjs/toolkit";

export const accountSlice = createSlice({
    name: 'accounts',
    initialState: {
        accounts: []
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
        deleteAccount: (state, action) => {
            state.accounts = state.accounts.filter(account => account.id != action.payload.id)
        }
    }
})

export const {setAccounts, addAccount, updateAccount, deleteAccount} = accountSlice.actions

export default accountSlice.reducer