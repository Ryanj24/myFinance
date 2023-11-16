import profileImg from '../../assets/Financial-Data-illustration.svg'
import { Typography } from '@mui/material'
import { useSelector } from 'react-redux'

const NavHeader = () => {

  const user = useSelector((state) => state.user.user.user)
  
  return (
    <header className='user-header'>
        <div className="user-picture-container">
            <img src={profileImg} alt='user profile image'/>
        </div>
        <div className="name-email">
            <Typography variant='h4' component="h4">{user.first_name} {user.last_name}</Typography>
            <Typography variant='body1' component="p">{user.email}</Typography>
        </div>
    </header>
  )
}

export default NavHeader