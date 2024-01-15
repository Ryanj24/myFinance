import React from 'react'
import './GoalModal.css'
import GoalForm from '../GoalForm/GoalForm'
import { Close } from '@mui/icons-material'

const GoalModal = ({modalType, toggleModal}) => {
  return (
    <div className='goal-modal-container'>
        <div className="goal-modal">
            <header className='modal-header'>
                <h2>New Goal</h2>
                <div className="modal-close-btn-container">
                    <button onClick={() => toggleModal(false)}>
                        <Close />
                    </button>
                </div>
            </header>
            <GoalForm formType={modalType} toggleModal={toggleModal}/>
        </div>
    </div>
  )
}

export default GoalModal