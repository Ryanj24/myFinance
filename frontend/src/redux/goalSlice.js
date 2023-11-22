import { createSlice } from "@reduxjs/toolkit";

export const goalSlice = createSlice({
    name: 'goals',
    initialState: {
        goals: null
    },
    reducers: {
        setGoals: (state, action) => {
            state.goals = action.payload
        },
        addGoal: (state, action) => {
            state.goals = [...state.goals, action.payload]
        },
        updateGoal: (state, action) => {
            state.goals = state.goals.map(goal => goal.id === action.payload.id ? action.payload : goal)
        },
        deleteGoal: (state, action) => {
            state.goals = state.goals.filter(goal => goal.id != action.payload.id)
        }
    }
})

export const {setGoals, addGoal, updateGoal, deleteGoal} = goalSlice.actions

export default goalSlice.reducer