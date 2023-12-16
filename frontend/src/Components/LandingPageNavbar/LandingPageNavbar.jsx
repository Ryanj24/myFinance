import React from 'react'
import './LandingPageNavbar.css'
import { Link } from 'react-router-dom'
import {Button, Container} from '@mui/material'
import Logo from '../../assets/myFinance-logo.png'

const LandingPageNavbar = () => {
  return (
    <nav className='top-navbar'>
        <header className='title-logo'>
            <img src={Logo} alt='myFinance-Logo' />
        </header>
        <ul className='nav-links'>
            <li className="nav-link">
                <Link to="/login">Login</Link>
            </li>
            <li className="nav-link">
                <Button variant='contained' href='/register' sx={{textTransform: "none", borderRadius: "10px"}}>Create Account</Button>
            </li>
        </ul>
    </nav>
  )
}

export default LandingPageNavbar