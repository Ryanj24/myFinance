import React from 'react'
import './Register.css'
import {Box, Container, Typography} from '@mui/material'
import Logo from '../../assets/myFinance-logo.png'
import registerIllustration from '../../assets/Sign-up-illustration.svg'
import LoginRegisterForm from '../../Components/LoginRegisterForm/LoginRegisterForm.jsx'

const Register = () => {
  return (
    <Box sx={{display: "flex"}}>
        <Box component="div" className='register-illustration-container' sx={{flexGrow: 1}}>
            <img src={registerIllustration} alt='Sign up illustration' height= "70%" width= "70%"/>
        </Box>
        <Box className="form-container">
          <img src={Logo} alt='myFinance-Logo' />
          <LoginRegisterForm formType="Register"/>
        </Box>
    </Box>
  )
}

export default Register