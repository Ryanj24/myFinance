import React from 'react'
import './GoalModal.css'
import GoalForm from '../GoalForm/GoalForm'
import { Close } from '@mui/icons-material'

const GoalModal = ({modalType, toggleModal, goal}) => {
  return (
    <div className='goal-modal-container'>
        <div className="goal-modal">
            <header className='modal-header'>
                {modalType === "Add Goal" ? <h2>Add Goal</h2> : (modalType === "Edit Goal") ? <h2>Edit Goal</h2> : <h2>Update Progress</h2>}
                <div className="modal-close-btn-container">
                    <button onClick={() => toggleModal(false)}>
                        <Close />
                    </button>
                </div>
            </header>
            <GoalForm formType={modalType} toggleModal={toggleModal} goal={goal}/>
        </div>
    </div>
  )
}

export default GoalModal