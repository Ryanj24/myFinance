import { createSlice } from "@reduxjs/toolkit";

export const budgetSlice = createSlice({
    name: 'budgets',
    initialState: {
        budgets: null
    },
    reducers: {
        setBudgets: (state, action) => {
            state.budgets = action.payload
        },
        addBudget: (state, action) => {
            state.budgets = [...state.budgets, action.payload]
        },
        updateBudget: (state, action) => {
            state.budgets = state.budgets.map(budget => budget.id === action.payload.id ? action.payload : budget)
        }
    }
})

export const {setBudgets, addBudget, updateBudget} = budgetSlice.actions

export default budgetSlice.reducer