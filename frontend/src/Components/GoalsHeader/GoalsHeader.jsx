import React from 'react'
import './GoalsHeader.css'
import { useState } from 'react';
import { Add } from '@mui/icons-material';
import GoalModal from '../GoalModal/GoalModal';

const GoalsHeader = () => {
    const [goalModalActive, setGoalModalActive] = useState(false);

    return (
      <>
      {goalModalActive && <GoalModal modalType="Add Goal" toggleModal={setGoalModalActive}/>}
      <header className='goals-header'>
          <h1>Goals</h1>
          <div className="goals-action-btn">
              <button className='create-goal-btn' onClick={() => setGoalModalActive(true)}>
                  <Add /> Create Goal
              </button>
          </div>
      </header>
      </>
    )
}

export default GoalsHeader