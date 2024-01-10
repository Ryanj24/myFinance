import React, { useState } from 'react'
import './BudgetDetails.css'
import DashboardBudgetForm from '../DashboardBudgetForm/DashboardBudgetForm';
import BudgetChart from '../BudgetChart/BudgetChart';
import { useSelector } from 'react-redux';
import { budgetDataPreprocessor } from '../../utilityFunctions/budgetDataPreprocessor';
import { transactionDataPreprocessor } from '../../utilityFunctions/transactionDataPreprocessor';
import { joinArraysOfObjects } from '../../utilityFunctions/joinArraysOfObjects';

const BudgetDetails = () => {

    const [selectedMonth, setSelectedMonth] = useState("January");
    const [selectedYear, setSelectedYear] = useState(2010);

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
    <section className='budget-details'>
        <DashboardBudgetForm setSelectedMonth={setSelectedMonth} setSelectedYear={setSelectedYear}/>
        <BudgetChart categorySpend={categoryAmountSpent} categoryTotals={categoryTotalBudget} formattedData={joinedData}/>
    </section>
  )
}

export default BudgetDetails