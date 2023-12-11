import React from 'react'
import {Link} from 'react-router-dom'
import {Dashboard, AccountCircle, AccountBalance, CandlestickChart, EmojiEvents, Logout} from '@mui/icons-material/'
import { useDispatch } from 'react-redux'
import { removeUser } from '../../redux/userSlice.js'
import { setAccounts } from '../../redux/accountSlice.js'
import { setBankTransactions } from '../../redux/bankTransactionSlice.js'
import { setBudgets } from '../../redux/budgetSlice.js'
import { setGoals } from '../../redux/goalSlice.js'
import { setPortfolios } from '../../redux/portfolioSlice.js'
import { setStockTransactions } from '../../redux/stockTransactionSlice.js'

const NavLinks = () => {

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(removeUser())
    dispatch(setAccounts(null))
    dispatch(setBankTransactions(null))
    dispatch(setBudgets(null))
    dispatch(setGoals(null))
    dispatch(setPortfolios(null))
    dispatch(setStockTransactions(null))
  }
  
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
          <Link to="/" onClick={handleLogout}>
            <Logout />
            <p>Log out</p>
          </Link>
        </li>
    </ul>
  )
}

export default NavLinks