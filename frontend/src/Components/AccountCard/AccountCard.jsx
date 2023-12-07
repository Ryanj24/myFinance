import React from 'react'
import './AccountCard.css'
import { Icon, Typography } from '@mui/material'
import { bankIcons } from '../DashboardCards/Accounts.jsx'
import { ArrowForward } from '@mui/icons-material'
import { Link } from 'react-router-dom'


const AccountCard = ({account}) => {
  return (
    <div className='account-card'>
        <div className="account-logo-container">
            <Icon><img src={bankIcons[account.iconIndex]} alt="Account Logo" height="100%" width="100%"/></Icon>
        </div>
        <div className="account-name-number">
            <Typography variant='h5' component="h5">{account.account_name}</Typography>
        </div>
        <div className="account-balance">
            <Typography variant='h6' component="h6" gutterBottom>Available Balance</Typography>
            <Typography variant='body2' component="p">£{parseInt(account.balance)}</Typography>
        </div>
        <div className="view-account-icon-container">
            <Link className='view-account-btn' to={`/home/accounts/${account.id}`}>
                <ArrowForward />
            </Link>
        </div>
    </div>
  )
}

export default AccountCard