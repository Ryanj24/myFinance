import React, { useState } from 'react'
import './BudgetHeader.css'
import { Add } from '@mui/icons-material'
import BudgetModal from '../BudgetModal/BudgetModal';

const BudgetHeader = () => {

    const [budgetModalActive, setBudgetModalActive] = useState(false);

  return (
    <>
    {budgetModalActive && <BudgetModal modalType="Set Budget" toggleModal={setBudgetModalActive}/>}
    <header className='budgets-header'>
        <h1>Budget</h1>
        <div className="budgets-action-btn">
            <button className='create-budget-btn' onClick={() => setBudgetModalActive(true)}>
                <Add /> Set Budget
            </button>
        </div>
    </header>
    </>
  )
}

export default BudgetHeader