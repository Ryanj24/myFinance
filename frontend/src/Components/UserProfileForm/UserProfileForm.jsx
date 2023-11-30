import React from 'react'
import './UserProfileForm.css'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Button } from '@mui/material'


const UserProfileForm = () => {

    const user = useSelector(state => state.user.user.user)
    const {register, handleSubmit} = useForm({
        defaultValues: {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            date_of_birth: user.date_of_birth
        }
    })
    const dispatch = useDispatch()

    const onSubmit = async (data) => {
        console.log(data);
    }

  return (
    <form id='user-profile-form' onSubmit={handleSubmit(onSubmit)}>
        <div className="user-first-name">
            <label htmlFor='first_name'>First Name</label>
            <input type="text" id='first_name' {...register("first_name")}/>
        </div>

        <div className="user-last-name">
            <label htmlFor='last_name'>Last Name</label>
            <input type="text" id='last_name' {...register("last_name")}/>
        </div>

        <div className="user-email">
            <label htmlFor='email'>Email</label>
            <input type="email" id='email' {...register("email")}/>
        </div>

        <div className="user-dob">
            <label htmlFor='date_of_birth'>Date of Birth</label>
            <input type="date" id='date_of_birth' {...register("date_of_birth")}/>
        </div>
        <div className="save-btn-container">
            <Button variant='contained' sx={{textTransform: "none", borderRadius: "10px"}} type='submit'>Save Changes</Button>
        </div>
    </form>
  )
}

export default UserProfileForm