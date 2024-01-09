import React from 'react'
import './BudgetModal.css'
import { Close } from '@mui/icons-material'

const BudgetModal = ({modalType, toggleModal}) => {
  return (
    <div className='budget-modal-container'>
        <div className="budget-modal">
            <header className='modal-header'>
                {modalType === "Set Budget"
                ? <h2>Set Budget</h2>
                : <h2>Edit Budget</h2>
                }
                <div className="modal-close-btn-container">
                    <button onClick={() => toggleModal(false)}>
                        <Close />
                    </button>
                </div>
            </header>
        </div>
    </div>
  )
}

export default BudgetModal