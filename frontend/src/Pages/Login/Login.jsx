import loginIllustration from '../../assets/Login-illustration.svg'
import LoginRegisterForm from '../../Components/LoginRegisterForm/LoginRegisterForm.jsx'
import './Login.css'
import {Box, Typography} from '@mui/material'

const Login = () => {
  return (
    <Box sx={{display: "flex"}}>
        <Box component="div" className='login-illustration-container' sx={{flexGrow: 1}}>
            <img src={loginIllustration} alt='Log in illustration' height= "70%" width= "70%"/>
        </Box>
        <Box className="form-container">
          <Typography variant='h3' component="h3" className='form-header'>
            myFinance
          </Typography>
          <LoginRegisterForm formType="Login"/>
        </Box>
    </Box>
  )
}

export default Login