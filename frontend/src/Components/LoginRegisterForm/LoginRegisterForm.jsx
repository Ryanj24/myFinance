import React from 'react'
import './LoginRegisterForm.css'
import { Box, Button, Typography } from '@mui/material'

const LoginRegisterForm = () => {
  return (
    <form id='login-register-form'>
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
  )
}

export default LoginRegisterForm