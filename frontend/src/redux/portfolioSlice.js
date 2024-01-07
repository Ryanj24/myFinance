import { createSlice } from "@reduxjs/toolkit";
import { sortStrings } from "../utilityFunctions/sortStrings";

export const portfolioSlice = createSlice({
    name: 'portfolios',
    initialState: {
        portfolios: null,
        holdings: null
    },
    reducers: {
        setPortfolios: (state, action) => {
            state.portfolios = action.payload
        },
        setHoldings: (state, action) => {
            state.holdings = action.payload
        },
        addPortfolio: (state, action) => {
            state.portfolios = [...state.portfolios, action.payload]
        },
        addHolding: (state, action) => {
            state.holdings = [...state.holdings, action.payload]
        },
        updatePortfolio: (state, action) => {
            state.portfolios = state.portfolios.map(portfolio => portfolio.id === action.payload.id ? action.payload : portfolio)
        },
        increaseHoldingShares: (state, action) => {
            state.holdings = state.holdings.map(holding => holding.company_name === action.payload.company_name ? {...holding, shares: holding.shares + action.payload.shareQuantity, avgPurchasePrice: ((holding.shares * holding.avgPurchasePrice) + (action.payload.shareQuantity * action.payload.pricePerShare)) / (holding.shares + action.payload.shareQuantity)}: holding)
        },
        decreaseHoldingShares: (state, action) => {
            state.holdings = state.holdings.map(holding => holding.company_name === action.payload.company_name ? {...holding, shares: holding.shares - action.payload.shareQuantity, avgPurchasePrice: ((holding.shares - action.payload.shareQuantity) * holding.avgPurchasePrice) / (holding.shares - action.payload.shareQuantity)}: holding)
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
        },
        sortHoldings: (state, action) => {
            switch (action.payload) {
                case "nameAtoZ":
                    state.holdings = state.holdings.sort((a, b) => sortStrings(a.company_name, b.company_ticker))
                    break
                case "nameZtoA":
                    state.holdings = state.holdings.sort((a, b) => sortStrings(a.company_name, b.company_ticker)).reverse()
                    break
                case "sharesLtoH":
                    state.holdings = state.holdings.sort((a, b) => a.shares - b.shares)
                    break
                case "sharesHtoL":
                    state.holdings = state.holdings.sort((a, b) => a.shares - b.shares).reverse()
                    break
                case "priceLtoH":
                    state.holdings = state.holdings.sort((a, b) => a.avgPurchasePrice - b.avgPurchasePrice)
                    break
                case "priceHtoL":
                    state.holdings = state.holdings.sort((a, b) => a.avgPurchasePrice - b.avgPurchasePrice).reverse()
                    break
                default:
                    break
            }
        }
    }
})

export const {setPortfolios, setHoldings, addPortfolio, addHolding, updatePortfolio, increaseHoldingShares, decreaseHoldingShares, incrementPortfolioBalance, decrementPortfolioBalance, deletePortfolio, sortPortfolios, sortHoldings} = portfolioSlice.actions

export default portfolioSlice.reducer