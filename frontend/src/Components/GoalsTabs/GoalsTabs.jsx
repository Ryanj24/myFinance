import React from 'react'
import './GoalsTabs.css'
import { useState } from 'react'
import GoalsContainer from '../GoalsContainer/GoalsContainer'

const GoalsTabs = () => {
    const [selectedTab, setSelectedTab] = useState("Active")

    const handleOnClick = (e) => {
        setSelectedTab(`${e.target.innerHTML}`)
    }

  return (
    <>
    <ul className='goals-nav-links'>
        <li className='goals-nav-link'>
            <button className={selectedTab === "Active" ? 'selected' : null} onClick={handleOnClick}>
                Active
            </button>

        </li>
        <li className='goals-nav-link'>
            <button className={selectedTab === "Completed" ? 'selected' : null} onClick={handleOnClick}>
                Completed
            </button>
        </li>
    </ul>
    <GoalsContainer selectedTab={selectedTab}/>
    </>
  )
}

export default GoalsTabs