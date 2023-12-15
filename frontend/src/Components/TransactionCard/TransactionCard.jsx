import React, { useRef } from 'react'
import './TransactionCard.css'
import { Paper } from '@mui/material'
import { MoreHoriz } from '@mui/icons-material'
import { dateFormatter } from '../../utilityFunctions/dateFormatter'

const TransactionCard = ({id, icon, desc, date, amount, toggleModal, setCurrentTransactionID}) => {


    const handleOnClick = (e) => {
        setCurrentTransactionID(id)
        toggleModal(true)
    }
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
        <div className="transaction-action-btns">
            <button onClick={handleOnClick}>
                <MoreHoriz sx={{rotate: "90deg"}} />
            </button>
        </div>
    </Paper>
  )
}

export default TransactionCard