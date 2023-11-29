import React from 'react'
import { useSelector } from 'react-redux'
import { Home, Commute, Fastfood, HomeRepairService, HealthAndSafety, DevicesOther, ConfirmationNumber, MoreHoriz } from '@mui/icons-material';
import SpendingCard from '../SpendingCard/SpendingCard.jsx';
import { transactionIcon } from '../../utilityFunctions/transactionIcon.js';

const budgetIconArray = [<Home sx={{color: '#FD3C17'}}/>, <Commute sx={{color: '#407BFF'}}/>, <Fastfood sx={{color: '#FFA500'}}/>, <HomeRepairService sx={{color: '#17FDE0'}}/>, <HealthAndSafety sx={{color: '#4EFD17'}}/>, <DevicesOther sx={{color: '#808080'}}/>, <ConfirmationNumber sx={{color: '#FD17F6'}}/>, <MoreHoriz sx={{color: '#C0C0C0'}}/>]

const Transactions = () => {

    const transactions = useSelector(state => state.bankTransactions.transactions);

    if (transactions === null) {
      return (
        <h1>Loading...</h1>
      )
    }

    const recentTransactions = transactions.slice().sort((a, b) => b.id - a.id).slice(0, 5).map(obj => transactionIcon(obj))

  return (
    <div className="transactions">
        <header className='transactions-header'>
          <h3>Recent Transactions</h3>
        </header>
        <ul className='recent-transactions'>
          {recentTransactions.map((obj, index) => (
              <SpendingCard 
                key={obj.id}
                icon={budgetIconArray[obj.iconIndex]}
                name={obj.description === null ? "No Description": obj.description}
                amount={obj.type === "Expense" || obj.type === "Withdrawl" ? "-£" + obj.amount : "+£" + obj.amount}
              />
          ))}
        </ul>
    </div>
  )
}

export default Transactions