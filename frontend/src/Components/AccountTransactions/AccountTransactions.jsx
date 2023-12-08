import React from 'react'
import './AccountTransactions.css'
import { Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { budgetIconArray } from '../DashboardCards/Transactions'
import { transactionIcon } from '../../utilityFunctions/transactionIcon'
import TransactionCard from '../TransactionCard/TransactionCard'

const AccountTransactions = () => {

  const {id} = useParams()
  const transactions = useSelector(state => state.bankTransactions.transactions).filter(transaction => transaction.account_id == id).map(obj => transactionIcon(obj))

  return (
    <section className='account-transactions-section'>
        <header className='account-transactions-header'>
            <h2>
                Transactions
            </h2>
        </header>
        <section className="transactions-container">
          {transactions.length > 0
          ?
            <div className="account-transactions">
              {transactions.map((obj) => (
                <TransactionCard 
                key={obj.id}
                icon={budgetIconArray[obj.iconIndex]}
                desc={obj.description === null ? "No Description": obj.description}
                date={obj.transaction_date}
                amount={obj.type === "Expense" || obj.type === "Withdrawl" ? <p style={{color: "#FF1B1B"}}>-£{obj.amount}</p> : <p style={{color: "#09FF05"}}>+£{obj.amount}</p>}
                />  
              ))}
            </div>
          :
            <p>No transactions added yet</p>
          }
        </section>
    </section>
  )
}

export default AccountTransactions