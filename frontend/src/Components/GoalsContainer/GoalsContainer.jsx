import React, { useEffect } from 'react'
import './GoalsContainer.css'
import {useSelector} from 'react-redux'
import GoalCard from '../GoalCard/GoalCard'

const GoalsContainer = ({selectedTab}) => {

    const {goals} = useSelector(state => state.goals)

    let activeGoals = goals.filter(goal => goal.status === "Active")
    let completedGoals = goals.filter(goal => goal.status === "Completed")

    useEffect(() => {
        activeGoals = goals.filter(goal => goal.status === "Active")
        completedGoals = goals.filter(goal => goal.status === "Completed")
    }, [goals])


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
            <p style={{textAlign:"center", marginTop: "20px", fontSize: "large"}}>No current goals</p>
        :
            (completedGoals.length > 0)
            ?
            completedGoals.map(goal => (
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
            <p style={{textAlign:"center", marginTop: "20px", fontSize: "large"}}>No completed goals</p>
        }
    </section>
  )
}

export default GoalsContainer