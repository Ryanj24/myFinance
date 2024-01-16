import React, { useRef, useState, useEffect } from 'react'
import './GoalCard.css'
import { Link } from 'react-router-dom'
import { Typography } from '@mui/material'
import { ExpandMore } from '@mui/icons-material'
import ProgressBar from './ProgressBar/ProgressBar'
import {dateFormatter} from '../../utilityFunctions/dateFormatter.js'

const GoalCard = ({name, desc, currentProg, endGoal, endDate, status}) => {

    const [expanded, setExpanded] = useState(false)

    const cardRef = useRef(null)

    const currentDate = new Date()
    const goalEndDate = new Date(endDate)
    const remainingDays = (goalEndDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)


    useEffect(() => {
        if (expanded) {
          cardRef.current.style.height = "450px"
        } else {
          cardRef.current.style.height = "fit-content"
        }
      }, [expanded])
    return (
        <>
        {expanded
        ?
            <div className='goal-card expanded' ref={cardRef}>
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
                        <ExpandMore sx={{rotate: "180deg"}}/>
                    </button>
                </div>
                <div className="goal-date">
                    <Typography variant='h5' component="h5" gutterBottom>Achieve By</Typography>
                    <Typography variant='h5' component="h5" sx={{paddingLeft: "20px"}}>{dateFormatter(endDate, "full date")} (Days remaining: {remainingDays > 0 ? Math.round(remainingDays) : 0})</Typography>
                </div>
                <div className="goal-description">
                    <Typography variant='h5' component="h5" gutterBottom>Description</Typography>
                    <Typography variant='body1' component="p" sx={{paddingLeft: "20px", fontSize: "20px"}}>{desc}</Typography>
                </div>
            </div>
        :
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
        }
        </>
    )
}

export default GoalCard