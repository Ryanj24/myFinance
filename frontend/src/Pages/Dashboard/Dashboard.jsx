import React, { useEffect } from 'react'
import './Dashboard.css'
import { useSelector } from 'react-redux'
import { fetchUserData } from '../../utilityFunctions/fetchUserData.js'
import { useDispatch } from 'react-redux'
import { setAccounts } from '../../redux/accountSlice.js'
import { setBankTransactions } from '../../redux/bankTransactionSlice.js'
import { setPortfolios } from '../../redux/portfolioSlice.js'
import { setHoldings } from '../../redux/portfolioSlice.js'
import { setStockTransactions } from '../../redux/stockTransactionSlice.js'
import { setGoals } from '../../redux/goalSlice.js'
import { setBudgets } from '../../redux/budgetSlice.js'
import IncomeChart from '../../Components/DashboardCards/IncomeChart.jsx'
import Goals from '../../Components/DashboardCards/Goals.jsx'
import Budget from '../../Components/DashboardCards/Budget.jsx'
import Transactions from '../../Components/DashboardCards/Transactions.jsx'
import Accounts from '../../Components/DashboardCards/Accounts.jsx'


const Dashboard = () => {

  const dispatch = useDispatch();

  const userToken = useSelector((state) => state.user.user.token)
  const accounts = useSelector((state) => state.accounts.accounts)


  useEffect(() => {

    if (accounts === null) {
      fetchUserData(userToken)
      .then((data) => {
        dispatch(setAccounts(data.accounts.bankAccounts))
        dispatch(setBankTransactions(data.accounts.bankTransactions))
        dispatch(setPortfolios(data.portfolios.stockPortfolios))
        dispatch(setHoldings(data.portfolios.holdings))
        dispatch(setStockTransactions(data.portfolios.stockTransactions))
        dispatch(setGoals(data.goals))
        dispatch(setBudgets(data.budgets))
      })
      .catch((error) => console.log(error))
    }

  }, [])

  return (
    <section className='dashboard-grid'>
      <IncomeChart />
      <Goals />
      <Budget />
      <Transactions />
      <Accounts />
    </section>
  )
}

export default Dashboard