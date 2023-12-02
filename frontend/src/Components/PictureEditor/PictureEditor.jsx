import React, { useRef } from 'react'
import './PictureEditor.css'
import { Button } from '@mui/material'
import { Close } from '@mui/icons-material'
// import AvatarEditor from 'react-avatar-editor'

const PictureEditor = ({profileImage, setProfileImage, setEditorOpen}) => {


    const imgPreviewRef = useRef(null);

    const handleImageChange = (e) => {
        // Get the image object from the input field
        const image_file = e.target.files["0"]
        
        // If the image is present
        if (image_file) {

            // Create an instance of the FileReader class
            const image_reader = new FileReader();

            // Add an event handler property 
            image_reader.onload = (e) => {
                // Set the src of the preview image to be the uploaded image result
                imgPreviewRef.current.src = e.target.result
            }
            image_reader.readAsDataURL(image_file);
        }
    }

    const handleSaveChanges = () => {
        setProfileImage(imgPreviewRef.current.src);
        setEditorOpen(false);
    }

  return (
    <div className='editor-modal-container'>
        <div className="editor-modal">
            <header className='modal-header'>
                <h2>Edit Profile Picture</h2>
                <p>Upload an image below</p>
                <div className="modal-close-btn-container">
                    <button onClick={() => setEditorOpen(false)}>
                        <Close />
                    </button>
                </div>
            </header>

            <section className='modal-picture-edit-container'>
                <img ref={imgPreviewRef} style={{height: "100%", width: "100%"}} src={profileImage}/>
            </section>

            <div className="image-file-input">
                <input type='file' accept='image/*' multiple="false" onChange={handleImageChange}/>
            </div>

            <div className="modal-save-btn-container">
                <Button id='picture-save-btn' variant='contained' sx={{textTransform: "none", borderRadius: "10px"}} onClick={handleSaveChanges}>Save Changes</Button> 
            </div>
        </div>
    </div>
  )
}

export default PictureEditor