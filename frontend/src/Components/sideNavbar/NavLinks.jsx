import React from 'react'
import {Link} from 'react-router-dom'
import {Dashboard, AccountCircle, AccountBalance, CandlestickChart, Settings, Logout} from '@mui/icons-material/'

const NavLinks = () => {
  return (
    <ul className='nav-links'>
        <li className='nav-link'>
          <Link to="/dashboard">
            <Dashboard />
            <p>Dashboard</p>
          </Link>
        </li>
        <li className='nav-link'>
          <Link to="/profile">
            <AccountCircle />
            <p>Profile</p>
          </Link>
        </li>
        <li className='nav-link'>
          <Link to="/accounts">
            <AccountBalance />
            <p>Accounts</p>
          </Link>
        </li>
        <li className='nav-link'>
          <Link to="/portfolio">
            <CandlestickChart />
            <p>Stock Portfolio</p>
          </Link>
        </li>
        <li className='nav-link'>
          <Link to="/settings">
            <Settings />
            <p>Settings</p>
          </Link>
        </li>
        <li className='nav-link'>
          <Link to="/">
            <Logout />
            <p>Log out</p>
          </Link>
        </li>
    </ul>
  )
}

export default NavLinks