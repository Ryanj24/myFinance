import React from 'react'
import './LoginRegisterForm.css'
import { Box, Button, Container, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

const LoginRegisterForm = ({formType}) => {
  return (
    <Container component="div" className="form-layout-container" sx={{display: "flex", flexDirection: "column", alignItems: "center"}} maxWidth="sm">

        {formType === "Register"
        ?
          <>
            <form id='register-form'>
              <Box component="div" className='form-inputs'>
                <div className="first-name-input">
                  <label htmlFor='first_name'>First Name</label>
                  <input type="text" id='first_name' name='first_name'/>
                </div>

                <div className="last-name-input">
                  <label htmlFor='last_name'>Last Name</label>
                  <input type="text" id='last_name' name='last_name'/>
                </div>

                <div className="email-input">
                  <label htmlFor='email'>Email</label>
                  <input type="email" id='email' name='email'/>
                </div>

                <div className="password-input">
                  <label htmlFor='password'>Password</label>
                  <input type="password" id='password' name='password'/>
                </div>

                <div className="dob-input">
                  <label htmlFor='dob'>Date of Birth</label>
                  <input type="date" id='dob' name='dob'/>
                </div>
              </Box>
              <Button variant='contained' sx={{textTransform: "none", borderRadius: "10px"}}>Create Account</Button>
            </form>
            <Typography variant='body2' component="p" className='login-register-link'>
              Already have an account? <Link to={"/login"} style={{color: "var(--primary-col)"}}>Log in</Link>
            </Typography>
          </>
        :
          <>
            <form id='login-form'>
              <Box component="div" className='form-inputs'>
                <div className="email-input">
                  <label htmlFor='email'>Email</label>
                  <input type="email" id='email' name='email'/>
                </div>

                <div className="password-input">
                  <label htmlFor='password'>Password</label>
                  <input type="password" id='password' name='password'/>
                </div>
              </Box>
              <Button variant='contained' sx={{textTransform: "none", borderRadius: "10px"}}>Login</Button>
            </form>
            <Typography variant='body2' component="p" className='login-register-link'>
              New to myFinance? <Link to={"/register"} style={{color: "var(--primary-col)"}}>Create an account</Link>
            </Typography>
          </>
        }
        

    </Container>
  )
}

export default LoginRegisterForm