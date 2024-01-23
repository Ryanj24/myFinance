import React, { useState } from 'react'
import './Profile.css'
import { useSelector } from 'react-redux'
import { Edit } from '@mui/icons-material'
import UserProfileForm from '../../Components/UserProfileForm/UserProfileForm'
import UserProfilePicture from '../../Components/UserProfilePicture/UserProfilePicture'
import UserProfileDetails from '../../Components/UserProfileDetails/UserProfileDetails'
import defaultUserImg from '../../assets/user.png'

const Profile = () => {

  const user = useSelector(state => state.user.user.user)

  const [editing, setEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(user.profile_img);

  return (
    <section className='profile-container'>
      <header className='profile-page-header'>
        <h1>Profile</h1>
        <button className='profile-edit-btn' onClick={() => setEditing(!editing)}>
          <Edit /> Edit Profile
        </button>
      </header>

      <section className='user-profile'>
        <section className='user-header'>
          <UserProfilePicture profileImage={profileImage} setProfileImage={setProfileImage} editing={editing}/>
        </section>

        <section className='user-details'>
          {editing 
          ?
            <UserProfileForm profileImg={profileImage}/>
          :
            <UserProfileDetails />
          }
          
        </section>
      </section>
    </section>
  )
}

export default Profile