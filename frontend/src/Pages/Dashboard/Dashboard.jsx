import React from 'react'
import './Dashboard.css'


const Dashboard = () => {
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