import React from 'react'
import './GoalCardDropdown.css'
import { Add, Edit, Delete } from '@mui/icons-material'

const GoalCardDropdown = ({setDropdown, setModalActive, setModalType}) => {
  return (
    <div className='goal-card-dropdown'>
        <button className='goal-card-update-btn' onClick={() => {
            setDropdown(false)
            setModalActive(true)
            setModalType("Update Goal")
            }}>
            <Add /> Update
        </button>
        <button className='goal-card-edit-btn' onClick={() => {
            setDropdown(false)
            setModalActive(true)
            setModalType("Edit Goal")
            }}>
            <Edit /> Edit Goal
        </button>
        <button className='goal-card-delete-btn'>
            <Delete /> Delete Goal
        </button>
    </div>
  )
}

export default GoalCardDropdown