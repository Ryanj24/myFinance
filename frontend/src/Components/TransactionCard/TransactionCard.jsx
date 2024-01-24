import React, { useRef, useState } from 'react'
import './TransactionCard.css'
import { Paper } from '@mui/material'
import { Edit, Delete, MoreHoriz } from '@mui/icons-material'
import { dateFormatter } from '../../utilityFunctions/dateFormatter'
import { removeTransaction } from '../../utilityFunctions/removeTransaction'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { deleteBankTransaction } from '../../redux/bankTransactionSlice'
import { incrementAccountBalance, decrementAccountBalance } from '../../redux/accountSlice'

const TransactionCard = ({id, icon, desc, date, amount, toggleModal, setCurrentTransactionID}) => {

    const [dropdownActive, setDropdownActive] = useState(false);
    const accountID = useParams().id;
    const {token} = useSelector(state => state.user.user)
    const dispatch = useDispatch();

    const handleOnClick = (e) => {
        setDropdownActive(!dropdownActive)
    }

    const handleEditClick = () => {
        setDropdownActive(false);
        setCurrentTransactionID(id)
        toggleModal(true)
    }

    const handleDeleteClick = async () => {
        const response = await removeTransaction(id, accountID, token)

        dispatch(deleteBankTransaction(response))

        if (response.type === "Deposit" || response.type === "Income") {
            dispatch(decrementAccountBalance(response))
        } else {
            dispatch(incrementAccountBalance(response))
        }

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
                <button onClick={handleEditClick} className='edit-transaction-btn'>
                    <Edit /> Edit Transaction
                </button>
                <button onClick={handleDeleteClick} className='delete-transaction-btn'>
                    <Delete /> Delete Transaction
                </button>
            </div>
        }
    </Paper>
  )
}

export default TransactionCard