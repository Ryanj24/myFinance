import { createSlice } from "@reduxjs/toolkit";
import { sortStrings } from "../utilityFunctions/sortStrings";

export const portfolioSlice = createSlice({
    name: 'portfolios',
    initialState: {
        portfolios: null
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
        incrementPortfolioBalance: (state, action) => {
            state.portfolios = state.portfolios.map(portfolio => portfolio.id === action.payload.portfolio_id ? {...portfolio, balance: parseFloat(portfolio.balance) + parseFloat(action.payload.total_amount)} : portfolio)
        },
        decrementPortfolioBalance: (state, action) => {
            state.portfolios = state.portfolios.map(portfolio => portfolio.id === action.payload.portfolio_id ? {...portfolio, balance: parseFloat(portfolio.balance) - parseFloat(action.payload.total_amount)} : portfolio)
        },
        deletePortfolio: (state, action) => {
            state.portfolios = state.portfolios.filter(portfolio => portfolio.id != action.payload.id)
        },
        sortPortfolios: (state, action) => {
            switch (action.payload) {
                case "nameAtoZ":
                    state.portfolios = state.portfolios.sort((a, b) => sortStrings(a.portfolio_name, b.portfolio_name))
                    break
                case "nameZtoA":
                    state.portfolios = state.portfolios.sort((a, b) => sortStrings(a.portfolio_name, b.portfolio_name)).reverse()
                    break
                case "valueLtoH":
                    state.portfolios = state.portfolios.sort((a, b) => a.balance - b.balance)
                    break
                case "valueHtoL":
                    state.portfolios = state.portfolios.sort((a, b) => b.balance - a.balance)
                    break
                default:
                    break
            }
        }
    }
})

export const {setPortfolios, addPortfolio, updatePortfolio, incrementPortfolioBalance, decrementPortfolioBalance, deletePortfolio, sortPortfolios} = portfolioSlice.actions

export default portfolioSlice.reducer