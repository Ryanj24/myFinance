import React from 'react'
import './GoalCardDropdown.css'
import { Add, Edit, Delete } from '@mui/icons-material'
import { useSelector, useDispatch } from 'react-redux'
import { removeGoal } from '../../../utilityFunctions/goalRequests'
import { deleteGoal } from '../../../redux/goalSlice'

const GoalCardDropdown = ({setDropdown, setModalActive, setModalType, goal}) => {

  const {token} = useSelector(state => state.user.user)
  const dispatch = useDispatch()

  const handleDelete = async () => {
    const response = await removeGoal(goal.id, token)

    dispatch(deleteGoal(response))
  }

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
        <button className='goal-card-delete-btn' onClick={() => handleDelete()}>
            <Delete /> Delete Goal
        </button>
    </div>
  )
}

export default GoalCardDropdown