import React, { useState } from 'react'
import './Profile.css'
import profileImg from '../../assets/Login-illustration.svg'
import { useSelector } from 'react-redux'
import { Edit } from '@mui/icons-material'
import { Typography } from '@mui/material'
import UserProfileForm from '../../Components/UserProfileForm/UserProfileForm'

const Profile = () => {

  const [editing, setEditing] = useState(false);
  const user = useSelector(state => state.user.user.user)

  // console.log(user)
  return (
    <section className='profile-container'>
      <header className='profile-page-header'>
        <h1>Profile</h1>
        <button className='profile-edit-btn'>
          <Edit /> Edit Profile
        </button>
      </header>

      <section className='user-profile'>
        <section className='user-header'>
          <div className="profile-picture-container">
              <img src={profileImg} alt="Profile Picture" />
          </div>
          <Typography variant='h4'>{user.first_name} {user.last_name}</Typography>
        </section>

        <section className='user-details'>
          <UserProfileForm />
        </section>
      </section>
    </section>
  )
}

export default Profile