import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import DashboardBudgetForm from '../DashboardBudgetForm/DashboardBudgetForm';
import { budgetDataPreprocessor } from '../../utilityFunctions/budgetDataPreprocessor.js';
import { transactionDataPreprocessor } from '../../utilityFunctions/transactionDataPreprocessor.js';
import { Home, Commute, Fastfood, HomeRepairService, HealthAndSafety, DevicesOther, ConfirmationNumber, MoreHoriz } from '@mui/icons-material';
import { joinArraysOfObjects } from '../../utilityFunctions/joinArraysOfObjects.js';
import ListCard from '../ListCard/ListCard.jsx';
import BudgetChart from '../BudgetChart/BudgetChart.jsx';

export const budgetIconArray = [<Home sx={{color: '#FD3C17'}}/>, <Commute sx={{color: '#407BFF'}}/>, <Fastfood sx={{color: '#FFA500'}}/>, <HomeRepairService sx={{color: '#17FDE0'}}/>, <HealthAndSafety sx={{color: '#4EFD17'}}/>, <DevicesOther sx={{color: '#808080'}}/>, <ConfirmationNumber sx={{color: '#FD17F6'}}/>, <MoreHoriz sx={{color: '#C0C0C0'}}/>]

const Budget = () => {

  const [selectedMonth, setSelectedMonth] = useState("January");
  const [selectedYear, setSelectedYear] = useState(2020);

  const budgets = useSelector(state => state.budgets.budgets);
  const transactions = useSelector(state => state.bankTransactions.transactions)  

  if (budgets === null) {
    return (
      <h1>Loading...</h1>
    )
  }

  const categoryTotalBudget = budgetDataPreprocessor(budgets, selectedMonth, selectedYear)
  const categoryAmountSpent = transactionDataPreprocessor(transactions, selectedMonth, selectedYear)

  const joinedData = joinArraysOfObjects(categoryTotalBudget, categoryAmountSpent)

  return (
    <div className='budget'>
        <header className='budget-header'>
          <h3>Budget</h3>
        </header>
        <DashboardBudgetForm setSelectedMonth={setSelectedMonth} setSelectedYear={setSelectedYear}/>
        <BudgetChart categorySpend={categoryAmountSpent} categoryTotals={categoryTotalBudget} formattedData={joinedData} viewingPage="Dashboard"/>
        <section className='budget-breakdown'>
          <h3 style={{color: "var(--primary-col)"}}>
            Budget Breakdown
          </h3>
          <ul className='budget-categories'>
            {joinedData.map((obj, index) => (
              <ListCard 
                key={obj.category} 
                icon={budgetIconArray[index]}
                name={obj.category}
                amount={Intl.NumberFormat("en", {style:"currency", currency: "GBP"}).format(obj.amountSpent)}
                total={Intl.NumberFormat("en", {style:"currency", currency: "GBP"}).format(obj.total)}
              />
            ))}
          </ul>
        </section>
    </div>
  )
}


export default Budget