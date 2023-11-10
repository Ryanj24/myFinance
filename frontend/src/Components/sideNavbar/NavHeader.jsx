import profileImg from '../../assets/Financial-Data-illustration.svg'
import { Typography } from '@mui/material'

const NavHeader = () => {
  return (
    <header className='user-header'>
        <div className="user-picture-container">
            <img src={profileImg} alt='user profile image'/>
        </div>
        <div className="name-email">
            <Typography variant='h4' component="h4">Adam Jones</Typography>
            <Typography variant='body1' component="p">adamjones123@gmail.com</Typography>
        </div>
    </header>
  )
}

export default NavHeader