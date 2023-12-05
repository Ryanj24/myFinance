import React from 'react'
import './UserProfileDetails.css'
import { useSelector } from 'react-redux'
import { Typography } from '@mui/material'
import { dateFormatter } from '../../utilityFunctions/dateFormatter.js'

const UserProfileDetails = () => {
    const {user} = useSelector(state => state.user.user)
  return (
    <section id='user-profile-details'>
        <div className="user-first-name">
            <Typography variant='h5' component="h5">
                First Name
            </Typography>
            <label htmlFor='first_name'>{user.first_name}</label>
        </div>

        <div className="user-last-name">
            <Typography variant='h5' component="h5">
                Last Name
            </Typography>
            <label htmlFor='last_name'>{user.last_name}</label>
        </div>

        <div className="user-email">
            <Typography variant='h5' component="h5">
                Email Address
            </Typography>
            <label htmlFor='email'>{user.email}</label>
        </div>

        <div className="user-dob">
            <Typography variant='h5' component="h5">
                Date of Birth
            </Typography>
            <label htmlFor='date_of_birth'>{dateFormatter(user.date_of_birth)}</label>
        </div>
    </section>
  )
}

export default UserProfileDetails