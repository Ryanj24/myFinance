import React from 'react'
import './Register.css'
import {Box, Container, Typography} from '@mui/material'
import registerIllustration from '../../assets/Sign-up-illustration.svg'
import LoginRegisterForm from '../../Components/LoginRegisterForm/LoginRegisterForm.jsx'
import {Link} from 'react-router-dom'

const Register = () => {
  return (
    <Box sx={{display: "flex"}}>
        <Box component="div" className='register-illustration-container' sx={{flexGrow: 1}}>
            <img src={registerIllustration} alt='Sign up illustration' height= "70%" width= "70%"/>
        </Box>
        <Box className="form-container">
          <Container component="div" sx={{display: "flex", justifyContent: "center"}} maxWidth="sm">
              <Typography variant='h3' component="h3" className='form-header'>
                myFinance
              </Typography>
              <LoginRegisterForm />
              <Typography variant='body2' component="p">
                Already have an account? <Link to={"/login"} style={{color: "var(--primary-col)"}}>Log in</Link>
              </Typography>
          </Container>
        </Box>
    </Box>
  )
}

export default Register