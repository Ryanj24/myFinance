import { Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import Logo from '../../assets/myFinance-white-logo.png'

const NavHeader = () => {

  const user = useSelector((state) => state.user.user.user)
  
  return (
    <header className='user-header'>
        <div className="logo-container">
            <img src={Logo} alt='myFinance Logo'/>
        </div>
        <div className="name-email">
            <Typography variant='h4' component="h4" sx={{color: "#fff"}}>{user.first_name} {user.last_name}</Typography>
            <Typography variant='body1' component="p" sx={{color: "#fff"}}>{user.email}</Typography>
        </div>
    </header>
  )
}

export default NavHeader