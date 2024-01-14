import React from 'react'
import './BudgetModal.css'
import { Close } from '@mui/icons-material'
import BudgetForm from '../BudgetForm/BudgetForm'

const BudgetModal = ({modalType, toggleModal}) => {
  return (
    <div className='budget-modal-container'>
        <div className="budget-modal">
            <header className='modal-header'>
                <h2>Set Budget</h2>
                <div className="modal-close-btn-container">
                    <button onClick={() => toggleModal(false)}>
                        <Close />
                    </button>
                </div>
            </header>
            <BudgetForm formType={modalType} toggleModal={toggleModal}/>
        </div>
    </div>
  )
}

export default BudgetModal