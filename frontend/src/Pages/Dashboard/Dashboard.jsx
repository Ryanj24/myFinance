import React, { useEffect } from 'react'
import './Dashboard.css'
import { useSelector } from 'react-redux'
import { fetchUserData } from '../../utilityFunctions/fetchUserData.js'
import { useDispatch } from 'react-redux'
import { setAccounts } from '../../redux/accountSlice.js'


const Dashboard = () => {

  const dispatch = useDispatch();

  const userToken = useSelector((state) => state.user.user.token)
  const accounts = useSelector((state) => state.accounts.accounts)
  const portfolios = useSelector((state) => state.portfolios)


  useEffect(() => {
    fetchUserData(userToken)
    .then((data) => dispatch(setAccounts(data)))
    .catch((error) => console.log(error))

  }, [])

  return (
    <section className='dashboard-grid'>
      <div className="income-chart">Yearly Income</div>
      <div className="goals">Current Goals</div>
      <div className="budget">Monthly Budget</div>
      <div className="transactions">Recent Transactions</div>
      <div className="accounts">Accounts Overview</div>
    </section>
  )
}

export default Dashboard