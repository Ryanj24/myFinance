import React from 'react'
import './GoalForm.css'
import {useForm} from 'react-hook-form'
import { Button } from '@mui/material'

const GoalForm = ({formType, toggleModal}) => {

    const {register, handleSubmit, formState: {isSubmitSuccessful}} = useForm()

    const onSubmit = (data) => {
        console.log(data)
        toggleModal(false)
    }

  return (
    <form id='goal-modal-form' onSubmit={handleSubmit(onSubmit)}>
        <div className="goal-name">
            <label htmlFor='goal_name'>Goal Name</label>
            <input type="text" id='goal_name' {...register("goal_name")}/>
        </div>  

        <div className="goal-desc">
            <label htmlFor='goal_desc'>Goal Description</label>
            <input type="text" id='goal_desc' {...register("goal_desc")}/>
        </div>

        <div className="goal-end-amount">
            <label htmlFor='goal_end_amount'>End Goal Amount</label>
            <input type="number" id='goal_end_amount' {...register("goal_end_amount")} min={0}/>
        </div>

        <div className="save-btn-container">
            {formType === "Add Goal"
            ?
                <Button variant='contained' sx={{textTransform: "none", borderRadius: "10px"}} type='submit'>Create Goal</Button>
            :
                <Button variant='contained' sx={{textTransform: "none", borderRadius: "10px"}} type='submit'>Update Goal</Button>
            }
            
        </div>
    </form>
  )
}

export default GoalForm