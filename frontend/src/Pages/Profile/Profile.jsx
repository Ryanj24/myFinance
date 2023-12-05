import React, { useState } from 'react'
import './Profile.css'
import profileImg from '../../assets/Login-illustration.svg'
import { useSelector } from 'react-redux'
import { CameraAlt, Edit } from '@mui/icons-material'
import { Typography } from '@mui/material'
import UserProfileForm from '../../Components/UserProfileForm/UserProfileForm'
import UserProfilePicture from '../../Components/UserProfilePicture/UserProfilePicture'

const Profile = () => {

  const user = useSelector(state => state.user.user.user)

  const [editing, setEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(user.profile_img);

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
          <UserProfilePicture profileImage={profileImage} setProfileImage={setProfileImage} editing={editing}/>
        </section>

        <section className='user-details'>
          <UserProfileForm profileImg={profileImage}/>
        </section>
      </section>
    </section>
  )
}

export default Profile