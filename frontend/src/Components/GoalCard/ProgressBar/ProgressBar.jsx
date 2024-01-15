import React from 'react'
import './ProgressBar.css'

const ProgressBar = ({currentProg, endGoal}) => {
  return (
    <div className='goal-progress-bar-container'>
        <div className="current-progress" style={{width: `${(currentProg / endGoal) * 100}%`}}>
          {currentProg / endGoal === 0
          ?
            null
          :
            `${Math.round(currentProg / endGoal * 100)}%`
          }
        </div>
    </div>
  )
}

export default ProgressBar