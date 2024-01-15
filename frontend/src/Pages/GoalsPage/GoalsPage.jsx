import React from 'react'
import './GoalsPage.css'
import GoalsHeader from '../../Components/GoalsHeader/GoalsHeader'
import GoalsTabs from '../../Components/GoalsTabs/GoalsTabs'

const GoalsPage = () => {
  return (
    <section className='goals-container'>
        <GoalsHeader />
        <GoalsTabs />
    </section>
  )
}

export default GoalsPage