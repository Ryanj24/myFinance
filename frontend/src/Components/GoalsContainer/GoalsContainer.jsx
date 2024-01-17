import React from 'react'
import './GoalsContainer.css'
import {useSelector} from 'react-redux'
import GoalCard from '../GoalCard/GoalCard'

const GoalsContainer = ({selectedTab}) => {

    const {goals} = useSelector(state => state.goals)

    const activeGoals = goals.filter(goal => goal.status === "Active")
    const completedGoals = goals.filter(goal => goal.status === "Completed")
  return (
    <section className='goal-cards-container'>
        {selectedTab === "Active"
        ?
            (activeGoals.length > 0)
            ?
            activeGoals.map(goal => (
                <GoalCard 
                    key={goal.id}
                    id={goal.id}
                    name={goal.goal_name}
                    desc={goal.goal_desc}
                    currentProg={goal.current_progress}
                    endGoal={goal.end_goal}
                    endDate={goal.end_date}
                />
            ))
            :
            <p>No current goals</p>
        :
            (completedGoals.length > 0)
            ?
            completedGoals.map(goal => (
                <GoalCard 
                    key={goal.id}
                    name={goal.goal_name}
                    desc={goal.goal_desc}
                    currentProg={goal.current_progress}
                    endGoal={goal.end_goal}
                    endDate={goal.end_date}
                />
            ))
            :
            <p>No goals completed</p>
        }
    </section>
  )
}

export default GoalsContainer