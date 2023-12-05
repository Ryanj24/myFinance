import React, { useState } from 'react'
import './UserProfilePicture.css'
import { useSelector } from 'react-redux'
import { Typography } from '@mui/material'
import { CameraAlt } from '@mui/icons-material'
import PictureEditor from '../PictureEditor/PictureEditor'

const UserProfilePicture = ({profileImage, setProfileImage, editing}) => {

    const {user} = useSelector(state => state.user.user)
    const [imageEditorOpen, setImageEditorOpen] = useState(false)

    const onClickEdit = () => {
        setImageEditorOpen(true)
    }

  return (
    <>
        {imageEditorOpen && <PictureEditor profileImage={profileImage} setProfileImage={setProfileImage} setImageEditorOpen={setImageEditorOpen} user={user}/>}
        <div className="profile-picture-container">
            <img src={profileImage} alt="Profile Picture" />
            {editing &&
                <div className="profile-pic-edit">
                    <button onClick={onClickEdit}>
                        <CameraAlt />
                    </button> 
                </div>
            }
        </div>
        <Typography variant='h4'>{user.first_name} {user.last_name}</Typography>
    </>
  )
}

export default UserProfilePicture