import React from 'react'
import './TopNavbar.css'
import { Link } from 'react-router-dom'
import {Button, Container} from '@mui/material'

const TopNavbar = () => {
  return (
    <nav className='top-navbar'>
        <header className='title-logo'>
            <h1>myFinance</h1>
        </header>
        <ul className='nav-links'>
            <li className="nav-link">
                <Link to="/login">Login</Link>
            </li>
            <li className="nav-link">
                <Button variant='contained' href='/register'>Create an Account</Button>
            </li>
        </ul>
    </nav>
  )
}

export default TopNavbar