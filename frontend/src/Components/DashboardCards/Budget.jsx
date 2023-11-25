import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import DashboardBudgetForm from '../DashboardBudgetForm/DashboardBudgetForm';
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { budgetDataPreprocessor } from '../../utilityFunctions/budgetDataPreprocessor.js';


const Budget = () => {

  const [selectedMonth, setSelectedMonth] = useState("January");
  const [selectedYear, setSelectedYear] = useState(2023);

  let chartData = [
    { name: 'Housing', value1: 400},
    { name: 'Transportation', value1: 300},
    { name: 'Food', value1: 300},
    { name: 'Utilities', value1: 200},
    { name: 'Medical & Healthcare', value1: 278},
    { name: 'Personal', value1: 189},
    { name: 'Entertainment', value1: 189},
    { name: 'Other', value1: 189},
  ]
  const budgets = useSelector(state => state.budgets.budgets);

  if (budgets === null) {
    return (
      <h1>Loading...</h1>
    )
  }

  const chartData2 = budgetDataPreprocessor(budgets, selectedMonth, selectedYear)

  console.log(chartData2)


  return (
    <div className='budget'>
        <header className='budget-header'>
          <h3>Budget</h3>
        </header>
        <DashboardBudgetForm setSelectedMonth={setSelectedMonth} setSelectedYear={setSelectedYear}/>
        <ResponsiveContainer maxHeight={400}>
          <PieChart width="100%" height="100%">
          <Pie data={chartData2} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label />
          </PieChart>
        </ResponsiveContainer>
    </div>
  )
}

export default Budget