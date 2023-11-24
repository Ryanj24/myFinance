import React from 'react'
import { useSelector } from 'react-redux'
import DashboardBudgetForm from '../DashboardBudgetForm/DashboardBudgetForm';


const Budget = () => {

  const budgets = useSelector(state => state.budgets.budgets);

  if (budgets === null) {
    return (
      <h1>Loading...</h1>
    )
  }


  return (
    <div className='budget'>
        <header className='budget-header'>
          <h3>Budget</h3>
        </header>
        <DashboardBudgetForm />
    </div>
  )
}

export default Budget