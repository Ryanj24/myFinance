import React, { useRef, useState, useEffect } from 'react'
import './GoalCard.css'
import { Link } from 'react-router-dom'
import { Typography } from '@mui/material'
import { ExpandMore } from '@mui/icons-material'
import ProgressBar from './ProgressBar/ProgressBar'

const GoalCard = ({name, desc, currentProg, endGoal, endDate, status}) => {

    const [expanded, setExpanded] = useState(false)

    const cardRef = useRef(null)

    useEffect(() => {
        if (expanded) {
          cardRef.current.style.height = "450px"
        } else {
          cardRef.current.style.height = "fit-content"
        }
      }, [expanded])
    return (
        <div className='goal-card' ref={cardRef}>
            <div className="goal-name">
                <Typography variant='h5' component="h5">{name}</Typography>
            </div>
            <div className="goal-progress">
                <ProgressBar currentProg={currentProg} endGoal={endGoal}/>
                <p className='progress-start'>{Intl.NumberFormat("en", {style: "currency", currency: "GBP"}).format(0)}</p>
                <p className='progress-end'>{Intl.NumberFormat("en", {style: "currency", currency: "GBP"}).format(endGoal)}</p>
            </div>
            <div className="goal-options">
                <button onClick={() => setExpanded(!expanded)}>
                    <ExpandMore />
                </button>
            </div>
        </div>
    )
}

export default GoalCard