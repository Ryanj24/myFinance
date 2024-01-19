import React, {useState} from 'react'
import './GoalForm.css'
import {useForm} from 'react-hook-form'
import { Button, Slider } from '@mui/material'
import { Add, Remove } from '@mui/icons-material'
import { createGoal, editGoalDetails, updateProgress } from '../../utilityFunctions/goalRequests'
import { useDispatch } from 'react-redux'
import { addGoal, editGoal, updateGoal } from '../../redux/goalSlice'

const GoalForm = ({formType, toggleModal, goal, userToken}) => {

    const [value, setValue] = useState(formType === "Add Goal" ? null : +goal.current_progress)

    const {register, handleSubmit, formState: {isSubmitSuccessful}} = useForm({defaultValues: {
        goal_name: formType === "Edit Goal" ? goal.goal_name : "",
        goal_desc: formType === "Edit Goal" ? goal.goal_desc : "",
        goal_end_date: formType === "Edit Goal" ? goal.end_date.slice(0, 10) : "",
        goal_end_amount: formType === "Edit Goal" ? +goal.end_goal : "",
    }})

    const dispatch = useDispatch()

    const onSubmit = async (data) => {
        if (formType === "Add Goal") {
            const response = await createGoal(data, userToken)

            console.log(response)

            dispatch(addGoal(response))

        } else if (formType === "Edit Goal") {
            const response = await editGoalDetails(data, goal.id, userToken)

            console.log(response)

            dispatch(editGoal(response))
        }

        toggleModal(false)
    }

    const progressUpdateSubmit = async () => {

        if (formType === "Update Goal") {
            const response = await updateProgress({updatedProgress: value}, goal.id, userToken)

            console.log(response)

            dispatch(updateGoal(response))

        }
        
        toggleModal(false)
    }

    const handleChange = (e, newVal) => {
        setValue(newVal)
    }

    const handleSliderButtonChange = (type) => {
        if (type === "decrement") {
            value > 0 ? setValue(value - 1) : 0
        } else {
            value < +goal.end_goal ? setValue(value + 1) : +goal.end_goal
        }
    }

  return (
    <>
    {formType === "Update Goal" 
    ?
        <form id='goal-update-form' onSubmit={handleSubmit(progressUpdateSubmit)}>
            <div className="amount-slider">
                <button className='slider-control-btns' onClick={() => handleSliderButtonChange("decrement")} type='button'><Remove /></button>
                <Slider 
                    id="amount-slider-component"
                    size='medium' 
                    valueLabelDisplay='on' 
                    valueLabelFormat={(val) => Intl.NumberFormat("en", {style: "currency", currency: "GBP"}).format(val)}
                    defaultValue={+goal.current_progress}
                    min={0}
                    max={+goal.end_goal}
                    step={1}
                    value={value} 
                    onChange={handleChange} 
                    sx={{width: 200}} 
                />
                <button className='slider-control-btns' onClick={() => handleSliderButtonChange("increment")} type='button'><Add /></button>
            </div>
            <div className="save-btn-container">
                <Button variant='contained' sx={{textTransform: "none", borderRadius: "10px"}} type='submit'>Update Goal</Button>
            </div>
        </form>
    :
        <form id='goal-modal-form' onSubmit={handleSubmit(onSubmit)}>
            <div className="goal-name">
                <label htmlFor='goal_name'>Name</label>
                <input type="text" id='goal_name' {...register("goal_name")}/>
            </div>  

            <div className="goal-desc">
                <label htmlFor='goal_desc'>Description</label>
                <textarea id='goal_desc' rows="5" {...register("goal_desc")}/>
            </div>

            <div className="goal-end-date">
                <label htmlFor='goal_end_date'>End Date</label>
                <input type="date" id='goal_end_date' {...register("goal_end_date")} min={0}/>
            </div>

            <div className="goal-end-amount">
                <label htmlFor='goal_end_amount'>Goal Amount</label>
                <input type="number" id='goal_end_amount' {...register("goal_end_amount")} min={0}/>
            </div>

            <div className="save-btn-container">
                {formType === "Add Goal"
                ?
                    <Button variant='contained' sx={{textTransform: "none", borderRadius: "10px"}} type='submit'>Create Goal</Button>
                :
                    <Button variant='contained' sx={{textTransform: "none", borderRadius: "10px"}} type='submit'>Edit Goal</Button>
                }
                
            </div>
        </form>
    }
    </>
  )
}

export default GoalForm