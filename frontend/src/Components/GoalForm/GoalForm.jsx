import React, {useState} from 'react'
import './GoalForm.css'
import {useForm} from 'react-hook-form'
import { Button, Slider } from '@mui/material'
import { Add, Remove } from '@mui/icons-material'

const GoalForm = ({formType, toggleModal, goal}) => {

    const [value, setValue] = useState(+goal.current_progress)

    const {register, handleSubmit, formState: {isSubmitSuccessful}} = useForm({defaultValues: {
        goal_name: formType === "Edit Goal" ? goal.goal_name : "",
        goal_desc: formType === "Edit Goal" ? goal.goal_desc : "",
        goal_end_date: formType === "Edit Goal" ? goal.end_date.slice(0, 10) : "",
        goal_end_amount: formType === "Edit Goal" ? +goal.end_goal : "",
    }})

    const onSubmit = (data) => {
        console.log(data)
        toggleModal(false)
    }

    const progressUpdateSubmit = () => {
        console.log(value)
    }

    const handleChange = (e, newVal) => {
        setValue(newVal)
    }

  return (
    <>
    {formType === "Update Goal" 
    ?
        <form id='goal-update-form' onSubmit={handleSubmit(progressUpdateSubmit)}>
            <div className="amount-slider">
                <button className='slider-control-btns' onClick={() => setValue(value - 1)}><Remove /></button>
                <Slider 
                    id="amount-slider-component"
                    size='medium' 
                    valueLabelDisplay='on' 
                    defaultValue={+goal.current_progress}
                    min={0}
                    max={+goal.end_goal}
                    step={1}
                    value={value} 
                    onChange={handleChange} 
                    sx={{width: 200}} 
                />
                <button className='slider-control-btns' onClick={() => setValue(value + 1)}><Add /></button>
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