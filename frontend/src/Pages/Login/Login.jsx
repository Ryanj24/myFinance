import loginIllustration from '../../assets/Login-illustration.svg'
import LoginRegisterForm from '../../Components/LoginRegisterForm/LoginRegisterForm.jsx'
import './Login.css'
import Logo from '../../assets/myFinance-logo.png'
import {Box, Typography} from '@mui/material'

const Login = () => {
  return (
    <Box sx={{display: "flex"}}>
        <Box component="div" className='login-illustration-container' sx={{flexGrow: 1}}>
            <img src={loginIllustration} alt='Log in illustration' height= "70%" width= "70%"/>
        </Box>
        <Box className="form-container">
          <img src={Logo} alt='myFinance-Logo' />
          <LoginRegisterForm formType="Login"/>
        </Box>
    </Box>
  )
}

export default Login