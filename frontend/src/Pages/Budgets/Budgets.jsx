import React from 'react'
import './Budgets.css'
import BudgetHeader from '../../Components/BudgetHeader/BudgetHeader'
import BudgetDetails from '../../Components/BudgetDetails/BudgetDetails'

const Budgets = () => {


  return (
    <section className='budgets-container'>
        <BudgetHeader />
        <BudgetDetails />
    </section>
  )
}

export default Budgets