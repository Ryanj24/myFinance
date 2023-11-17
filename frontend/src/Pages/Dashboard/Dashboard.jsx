import React, { useEffect } from 'react'
import './Dashboard.css'
import { useSelector } from 'react-redux'
import { fetchUserData } from '../../utilityFunctions/fetchUserData.js'
import { useDispatch } from 'react-redux'
import { setAccounts } from '../../redux/accountSlice.js'
import { setPortfolios } from '../../redux/portfolioSlice.js'
import IncomeChart from '../../Components/DashboardCards/IncomeChart.jsx'


const Dashboard = () => {

  const dispatch = useDispatch();

  const userToken = useSelector((state) => state.user.user.token)
  const accounts = useSelector((state) => state.accounts.accounts)
  const portfolios = useSelector((state) => state.portfolios)


  useEffect(() => {

    if (accounts === null) {
      fetchUserData(userToken)
      .then((data) => {
        dispatch(setAccounts(data.accounts))
        dispatch(setPortfolios(data.portfolios))
      })
      .catch((error) => console.log(error))
    }

  }, [])

  return (
    <section className='dashboard-grid'>
      <IncomeChart />
      <div className="goals">Current Goals</div>
      <div className="budget">Monthly Budget</div>
      <div className="transactions">Recent Transactions</div>
      <div className="accounts">Accounts Overview</div>
    </section>
  )
}

export default Dashboard