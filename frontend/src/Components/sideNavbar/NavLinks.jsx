import React from 'react'
import {Link} from 'react-router-dom'
import {Dashboard, AccountCircle, AccountBalance, CandlestickChart, EmojiEvents, Logout} from '@mui/icons-material/'
import { useDispatch } from 'react-redux'
import { removeUser } from '../../redux/userSlice.js'

const NavLinks = () => {

  const dispatch = useDispatch();
  
  return (
    <ul className='nav-links'>
        <li className='nav-link'>
          <Link to="/home/dashboard">
            <Dashboard />
            <p>Dashboard</p>
          </Link>
        </li>
        <li className='nav-link'>
          <Link to="/home/profile">
            <AccountCircle />
            <p>Profile</p>
          </Link>
        </li>
        <li className='nav-link'>
          <Link to="/home/accounts">
            <AccountBalance />
            <p>Accounts</p>
          </Link>
        </li>
        <li className='nav-link'>
          <Link to="/home/goals">
            <EmojiEvents />
            <p>Goals</p>
          </Link>
        </li>
        <li className='nav-link'>
          <Link to="/home/portfolio">
            <CandlestickChart />
            <p>Stock Portfolio</p>
          </Link>
        </li>
        <li className='nav-link'>
          <Link to="/" onClick={() => dispatch(removeUser())}>
            <Logout />
            <p>Log out</p>
          </Link>
        </li>
    </ul>
  )
}

export default NavLinks