import React, { useState } from 'react'
import './UserProfilePicture.css'
import { useSelector } from 'react-redux'
import { Typography } from '@mui/material'
import { CameraAlt } from '@mui/icons-material'
// import AvatarEditor from 'react-avatar-editor'
import PictureEditor from '../PictureEditor/PictureEditor'

const UserProfilePicture = ({profileImage, setProfileImage, editing}) => {

    const {user} = useSelector(state => state.user.user)
    const [editorOpen, setEditorOpen] = useState(false)

    const onClickEdit = () => {
        setEditorOpen(true)
    }

    // <AvatarEditor image={profileImage} width={250} height={250} border={50} borderRadius={100} scale={1.2} rotate={0}/>
  return (
    <>
        {editorOpen && <PictureEditor profileImage={profileImage} setProfileImage={setProfileImage} setEditorOpen={setEditorOpen}/>}
        <div className="profile-picture-container">
            <img src={profileImage} alt="Profile Picture" />
            <div className="profile-pic-edit">
            <button onClick={onClickEdit}>
                <CameraAlt />
            </button> 
            </div>
        </div>
        <Typography variant='h4'>{user.first_name} {user.last_name}</Typography>
    </>
  )
}

export default UserProfilePicture