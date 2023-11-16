import { createSlice } from "@reduxjs/toolkit";

export const portfolioSlice = createSlice({
    name: 'portfolio',
    initialState: {
        portfolios: []
    },
    reducers: {
        setPortfolios: (state, action) => {
            state.portfolios = action.payload
        },
        addPortfolio: (state, action) => {
            state.portfolios = [...state.portfolios, action.payload]
        },
        updatePortfolio: (state, action) => {
            state.portfolios = state.portfolios.map(portfolio => portfolio.id === action.payload.id ? action.payload : portfolio)
        },
        deletePortfolio: (state, action) => {
            state.portfolios = state.portfolios.filter(portfolio => portfolio.id != action.payload.id)
        }
    }
})

export const {setPortfolios, addPortfolio, updatePortfolio, deletePortfolio} = portfolioSlice.actions

export default portfolioSlice.reducer