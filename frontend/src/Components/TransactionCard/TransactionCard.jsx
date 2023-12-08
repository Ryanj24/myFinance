import React from 'react'
import './TransactionCard.css'
import { Paper } from '@mui/material'
import { dateFormatter } from '../../utilityFunctions/dateFormatter'

const TransactionCard = ({icon, desc, date, amount}) => {
  return (
    <Paper elevation={2} variant='elevation' className='transaction-card'>
        <div className="transaction-category">
            {icon}
        </div>
        <div className="transaction-desc">
            {desc}
        </div>
        <div className="transaction-date">
            {dateFormatter(date, "ddmmyy")}
        </div>
        <div className="transaction-amount">
            {amount}
        </div>
    </Paper>
  )
}

export default TransactionCard