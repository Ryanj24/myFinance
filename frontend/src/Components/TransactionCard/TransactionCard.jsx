import React, { useRef, useState } from 'react'
import './TransactionCard.css'
import { Paper } from '@mui/material'
import { Edit, Delete, MoreHoriz } from '@mui/icons-material'
import { dateFormatter } from '../../utilityFunctions/dateFormatter'

const TransactionCard = ({id, icon, desc, date, amount, toggleModal, setCurrentTransactionID}) => {

    const [dropdownActive, setDropdownActive] = useState(true);

    const handleOnClick = (e) => {
        setDropdownActive(!dropdownActive)
    }

    const handleEditClick = () => {
        setDropdownActive(false);
        setCurrentTransactionID(id)
        toggleModal(true)
    }

    const handleDeleteClick = () => {
        console.log("Delete")
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
        <div className="transaction-options">
            <button onClick={handleOnClick}>
                <MoreHoriz sx={{rotate: "90deg"}} />
            </button>
        </div>
        {dropdownActive && 
            <div className="transaction-action-btns">
                <button onClick={handleEditClick}>
                    <Edit /> Edit Transaction
                </button>
                <button onClick={handleDeleteClick}>
                    <Delete /> Delete Transaction
                </button>
            </div>
        }
    </Paper>
  )
}

export default TransactionCard