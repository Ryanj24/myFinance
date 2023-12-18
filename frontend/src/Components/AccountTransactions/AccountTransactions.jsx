import React, { useRef, useState } from 'react'
import './AccountTransactions.css'
import { Typography } from '@mui/material'
import { Add, MoreHoriz } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { budgetIconArray } from '../DashboardCards/Transactions'
import { transactionIcon } from '../../utilityFunctions/transactionIcon'
import TransactionsDropdown from '../TransactionsDropdown/TransactionsDropdown'
import TransactionCard from '../TransactionCard/TransactionCard'
import { sortBankTransactions } from '../../redux/bankTransactionSlice'
import AccountModal from '../AccountModal/AccountModal'

const AccountTransactions = () => {

  const [addTransactionModalActive, setAddTransactionModalActive] = useState(false);
  const [editTransactionModalActive, setEditTransactionModalActive] = useState(false);
  const [dropdownActive, setDropdownActive] = useState(false);

  const [currentTransactionID, setCurrentTransactionID] = useState(null); 


  const {id} = useParams()
  const transactions = useSelector(state => state.bankTransactions.transactions).filter(transaction => transaction.account_id == id)
  const dispatch = useDispatch()

  const clickedTransaction = transactions.filter(transaction => transaction.id == currentTransactionID)[0]

  const handleOnChange = (e) => {
    dispatch(sortBankTransactions(e.target.value))
  }

  const toggleDropdown = () => {
    setDropdownActive(!dropdownActive)
  }

  return (
    <>
      {addTransactionModalActive && <AccountModal modalType="Add Transaction" toggleModal={setAddTransactionModalActive}/>}
      {editTransactionModalActive && <AccountModal modalType="Edit Transaction" toggleModal={setEditTransactionModalActive} transaction={clickedTransaction}/>}
      <section className='account-transactions-section'>
          <header className='account-transactions-header'>
              <h2>
                  Transactions
              </h2>
              <button className='options-btn' onClick={toggleDropdown}>
                <MoreHoriz sx={{fontSize: "xx-large"}} />
              </button>
              {dropdownActive && 
                <TransactionsDropdown 
                  addTransactionModalActive={addTransactionModalActive}
                  setAddTransactionModalActive={setAddTransactionModalActive}
                  handleSortChange={handleOnChange}
                  toggleDropdown={setDropdownActive}
                  setDropdownActive={setDropdownActive}
                />
              }
          </header>
          <section className="transactions-container">
            {transactions.length > 0
            ?
              transactions.map(obj => transactionIcon(obj)).map(obj => (
                <TransactionCard 
                key={obj.id}
                id={obj.id}
                icon={budgetIconArray[obj.iconIndex]}
                desc={obj.description === null ? "No Description": obj.description}
                date={obj.transaction_date}
                amount={obj.type === "Expense" || obj.type === "Withdrawl" ? <p style={{color: "#FF1B1B"}}>-£{obj.amount}</p> : <p style={{color: "#09FF05"}}>+£{obj.amount}</p>}
                toggleModal={setEditTransactionModalActive}
                setCurrentTransactionID={setCurrentTransactionID}
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