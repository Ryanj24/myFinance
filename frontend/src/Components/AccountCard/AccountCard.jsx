import React from 'react'
import './AccountCard.css'
import { Icon, Typography } from '@mui/material'
import { bankIcons } from '../DashboardCards/Accounts.jsx'
import { ArrowForward } from '@mui/icons-material'


const AccountCard = ({provider, name, number, balance}) => {
  return (
    <div className='account-card'>
        <div className="account-logo-container">
            <Icon><img src={bankIcons[provider]} alt="Account Logo" height="100%" width="100%"/></Icon>
        </div>
        <div className="account-name-number">
            <Typography variant='h5' component="h5" gutterBottom>{name}</Typography>
            <Typography variant='body2' component="p">Account Number: {number}</Typography>
        </div>
        <div className="account-balance">
            <Typography variant='h6' component="h6" gutterBottom>Available Balance</Typography>
            <Typography variant='body2' component="p">£{parseInt(balance)}</Typography>
        </div>
        <div className="view-account-icon-container">
            <button className='view-account-btn'>
                <ArrowForward />
            </button>
        </div>
    </div>
  )
}

export default AccountCard