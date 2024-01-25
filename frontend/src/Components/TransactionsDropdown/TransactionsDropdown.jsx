import React from 'react'
import './TransactionsDropdown.css'
import { Add, SwapHoriz } from '@mui/icons-material'

const TransactionsDropdown = ({addTransactionModalActive, setAddTransactionModalActive, transferFundsModalActive, setTransferFundsModalActive, handleSortChange, setDropdownActive}) => {

    const handleAddTransactionClick = () => {
        setAddTransactionModalActive(!addTransactionModalActive)
        setDropdownActive(false)
    }

    const handleTransferFundsClick = () => {
        setTransferFundsModalActive(!transferFundsModalActive)
        setDropdownActive(false)
    }

  return (
    <div className='transactions-dropdown'>
        <div className="transaction-btns-container">
            <button className='add-transaction-btn' onClick={handleAddTransactionClick}>
                <Add /> Add Transaction
            </button>
            <button className='transfer-funds-btn' onClick={handleTransferFundsClick}>
                <SwapHoriz /> Transfer Funds
            </button>
        </div>        
        <div className="transactions-sort">
            <label htmlFor='transactions-sort-selector'>Sort by: </label>
            <select id='transactions-sort-selector' onChange={handleSortChange}>
                <option value="nameAtoZ">Name (A to Z)</option>
                <option value="nameZtoA">Name (Z to A)</option>
                <option value="newToOld">Date (Newest - Oldest)</option>
                <option value="oldToNew">Date (Oldest - Newest)</option>
                <option value="amountLtoH">Amount (Lowest - Highest)</option>
                <option value="amountHtoL">Amount (Highest - Lowest)</option>
            </select>
        </div>
    </div>
  )
}

export default TransactionsDropdown