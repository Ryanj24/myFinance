import React, { useEffect, useState } from 'react'
import './LoginRegisterForm.css'
import { Box, Button, Container, Typography, Alert } from '@mui/material'
import { Cancel, CheckCircleRounded } from '@mui/icons-material'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form' 
import { registerUser } from '../../utilityFunctions/registerUser.js'
import { loginUser } from '../../utilityFunctions/loginUser.js'
import { useDispatch } from 'react-redux'
import { setUser } from '../../redux/userSlice.js'

const LoginRegisterForm = ({formType}) => {

  const {register, handleSubmit, formState: {isSubmitSuccessful, errors}, setError, clearErrors, reset} = useForm();
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const navigation = useNavigate();
  
  const dispatch = useDispatch(); 

  const onSubmit = async (data) => {
    if (formType === "Register") {
      const response = await registerUser(data)

      if (response.error) {
        setError(`${response.field}`, {message: response.message})
      }

    } else {
      const response = await loginUser(data)

      if (response.error) {
        setError(`${response.field}`, {message: response.message})
        return
      }

      dispatch(setUser({user: response.user, token: response.token}))

    }
  }

  useEffect(() => {
    if (isSubmitSuccessful && formType === "Register") {
      reset();
      setRegistrationSuccess(true);
      setTimeout(() => {navigation("/login")}, 2000)
    }

    if (isSubmitSuccessful && formType === "Login") {
      navigation("/home/dashboard")
    }
  }, [isSubmitSuccessful])

  return (
    <Container component="div" className="form-layout-container" sx={{display: "flex", flexDirection: "column", alignItems: "center"}} maxWidth="sm">

        {errors.email && 
          <Alert variant='filled' severity='error' icon={<Cancel fontSize='inherit' />} sx={{marginTop: "20px", marginBottom: "20px"}}>
            {errors.email?.message}
          </Alert>
        }
        {errors.password && 
          <Alert variant='filled' severity='error' icon={<Cancel fontSize='inherit' />} sx={{marginTop: "20px", marginBottom: "20px"}}>
            {errors.password?.message}
          </Alert>
        }
        {errors.date_of_birth && 
          <Alert variant='filled' severity='error' icon={<Cancel fontSize='inherit' />} sx={{marginTop: "20px", marginBottom: "20px"}}>
            {errors.date_of_birth?.message}
          </Alert>
        }

        {
          registrationSuccess && 
          <Alert variant='filled' severity='success' icon={<CheckCircleRounded fontSize='inherit' />} sx={{marginTop: "20px", marginBottom: "20px"}}>
            <p>Registration successful! Redirecting to Login page</p>
          </Alert>
        }
        {formType === "Register"
        ?
          <>
            <form id='register-form' onSubmit={handleSubmit(onSubmit)}>
              <Box component="div" className='form-inputs'>
                <div className="first-name-input">
                  <label htmlFor='first_name'>First Name</label>
                  <input type="text" id='first_name' {...register("first_name")}/>
                </div>

                <div className="last-name-input">
                  <label htmlFor='last_name'>Last Name</label>
                  <input type="text" id='last_name' {...register("last_name")}/>
                </div>

                <div className="email-input">
                  <label htmlFor='email'>Email</label>
                  <input type="email" id='email' {...register("email")}/>
                </div>

                <div className="password-input">
                  <label htmlFor='password'>Password</label>
                  <input type="password" id='password' {...register("password")}/>
                </div>

                <div className="dob-input">
                  <label htmlFor='date_of_birth'>Date of Birth</label>
                  <input type="date" id='date_of_birth' {...register("date_of_birth")}/>
                </div>
              </Box>
              <Button variant='contained' sx={{textTransform: "none", borderRadius: "10px"}} type='submit'>Create Account</Button>
            </form>
            <Typography variant='body2' component="p" className='login-register-link'>
              Already have an account? <Link to={"/login"} style={{color: "var(--primary-col)"}}>Log in</Link>
            </Typography>
          </>
        :
          <>
            <form id='login-form' onSubmit={handleSubmit(onSubmit)}>
              <Box component="div" className='form-inputs'>
                <div className="email-input">
                  <label htmlFor='email'>Email</label>
                  <input type="email" id='email' {...register("email")}/>
                </div>

                <div className="password-input">
                  <label htmlFor='password'>Password</label>
                  <input type="password" id='password' {...register("password")}/>
                </div>
              </Box>
              <Button variant='contained' sx={{textTransform: "none", borderRadius: "10px"}} type='submit'>Login</Button>
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