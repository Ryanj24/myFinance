import React, { useRef } from 'react'
import './PictureEditor.css'
import { Button } from '@mui/material'
import { Close } from '@mui/icons-material'
import { appStorage } from '../../firebaseConfig'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

const PictureEditor = ({profileImage, setProfileImage, setEditorOpen, user}) => {


    const imgPreviewRef = useRef(null);
    let image_file;

    const handleImageChange = (e) => {
        // Get the image object from the input field
        image_file = e.target.files[0]
        
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


        const storageRef = ref(appStorage, `profile_images/${user.first_name + "-" + user.last_name + "-" + user.id}`)

        uploadBytes(storageRef, image_file)
        .then(() => {
            getDownloadURL(storageRef)
            .then((url) => {
                setProfileImage(url)
            })
            .catch(() => {
                console.log("Error getting image url")
            })
        })
        .catch((error) => {
            console.log(error.message)
        })

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
                <input type='file' accept='image/*' multiple={false} onChange={handleImageChange}/>
            </div>

            <div className="modal-save-btn-container">
                <Button id='picture-save-btn' variant='contained' sx={{textTransform: "none", borderRadius: "10px"}} onClick={handleSaveChanges}>Save Changes</Button> 
            </div>
        </div>
    </div>
  )
}

export default PictureEditor