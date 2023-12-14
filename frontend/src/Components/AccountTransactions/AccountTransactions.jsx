import React, { useState } from 'react'
import './AccountTransactions.css'
import { Typography } from '@mui/material'
import { Add } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { budgetIconArray } from '../DashboardCards/Transactions'
import { transactionIcon } from '../../utilityFunctions/transactionIcon'
import TransactionCard from '../TransactionCard/TransactionCard'
import { sortBankTransactions } from '../../redux/bankTransactionSlice'
import AccountModal from '../AccountModal/AccountModal'

const AccountTransactions = () => {

  const [modalActive, setModalActive] = useState(false);
  const {id} = useParams()
  const transactions = useSelector(state => state.bankTransactions.transactions).filter(transaction => transaction.account_id == id)
  const dispatch = useDispatch()

  const handleOnChange = (e) => {
    dispatch(sortBankTransactions(e.target.value))
  }

  return (
    <>
      {modalActive && <AccountModal modalType="Add Transaction" toggleModal={setModalActive}/>}
      <section className='account-transactions-section'>
          <header className='account-transactions-header'>
              <h2>
                  Transactions
              </h2>
              <div className="add-transaction-btn-container">
                <button className='add-transaction-btn' onClick={() => setModalActive(!modalActive)}>
                  <Add /> Add Transaction
                </button>
              </div>
              <div className="transactions-sort">
                <label htmlFor='transactions-sort-selector'>Sort by: </label>
                <select id='transactions-sort-selector' onChange={handleOnChange}>
                  <option value="nameAtoZ">Name (A to Z)</option>
                  <option value="nameZtoA">Name (Z to A)</option>
                  <option value="newToOld">Date (Newest - Oldest)</option>
                  <option value="oldToNew">Date (Oldest - Newest)</option>
                  <option value="amountLtoH">Amount (Lowest - Highest)</option>
                  <option value="amountHtoL">Amount (Highest - Lowest)</option>
                </select>
              </div>
          </header>
          <section className="transactions-container">
            {transactions.length > 0
            ?
              transactions.map(obj => transactionIcon(obj)).map(obj => (
                <TransactionCard 
                key={obj.id}
                icon={budgetIconArray[obj.iconIndex]}
                desc={obj.description === null ? "No Description": obj.description}
                date={obj.transaction_date}
                amount={obj.type === "Expense" || obj.type === "Withdrawl" ? <p style={{color: "#FF1B1B"}}>-£{obj.amount}</p> : <p style={{color: "#09FF05"}}>+£{obj.amount}</p>}
                />  
              ))
            :
              <p>No transactions added yet</p>
            }
          </section>
      </section>
    </>
  )
}

export default AccountTransactions