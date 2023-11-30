import React, { useEffect, useState } from 'react'
import './UserProfileForm.css'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Alert, Button } from '@mui/material'
import { Cancel, CheckCircleRounded } from '@mui/icons-material'
import { updateUserDetails } from '../../utilityFunctions/updateUserDetails.js'
import { setUser } from '../../redux/userSlice.js'


const UserProfileForm = () => {

    const [updateSuccess, setUpdateSuccess] = useState(false)
    const {user, token} = useSelector(state => state.user.user)

    const {register, handleSubmit, formState: {errors, isSubmitSuccessful}, setError} = useForm({
        defaultValues: {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            date_of_birth: user.date_of_birth.slice(0, 10)
        }
    })
    const dispatch = useDispatch()

    const onSubmit = async (data) => {
        const response = await updateUserDetails(data, token)

        if (response.error) {
            setError(`${response.field}`, {message: response.message})
            return
        }
        
        dispatch(setUser({user: response, token}))
    }

    useEffect(() => {
        if (isSubmitSuccessful) {
            setUpdateSuccess(true)
        }
    }, [isSubmitSuccessful])

  return (
    <>
        {errors.first_name && 
          <Alert variant='filled' severity='error' icon={<Cancel fontSize='inherit' />} className='update-error-div'>
            {errors.first_name?.message}
          </Alert>
        }
        {errors.last_name && 
          <Alert variant='filled' severity='error' icon={<Cancel fontSize='inherit' />} className='update-error-div'>
            {errors.last_name?.message}
          </Alert>
        }
        {errors.email && 
          <Alert variant='filled' severity='error' icon={<Cancel fontSize='inherit' />} className='update-error-div'>
            {errors.email?.message}
          </Alert>
        }
        {errors.date_of_birth && 
          <Alert variant='filled' severity='error' icon={<Cancel fontSize='inherit' />} className='update-error-div'>
            {errors.date_of_birth?.message}
          </Alert>
        }
        {
          updateSuccess && 
          <Alert variant='filled' severity='success' icon={<CheckCircleRounded fontSize='inherit' />} className='update-success-div'>
            <p>Details successully updated!</p>
          </Alert>
        }
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
    </>
  )
}

export default UserProfileForm