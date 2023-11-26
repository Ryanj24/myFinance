import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import DashboardBudgetForm from '../DashboardBudgetForm/DashboardBudgetForm';
import { ResponsiveContainer, PieChart, Pie, Tooltip, Label } from 'recharts';
import { budgetDataPreprocessor } from '../../utilityFunctions/budgetDataPreprocessor.js';

let chartData = [
  { name: 'Housing', value: 0},
  { name: 'Transportation', value: 0},
  { name: 'Food', value: 0},
  { name: 'Utilities', value: 0},
  { name: 'Medical & Healthcare', value: 0},
  { name: 'Personal', value: 0},
  { name: 'Entertainment', value: 0},
  { name: 'Other', value: 0},
]

const Budget = () => {

  const [selectedMonth, setSelectedMonth] = useState("January");
  const [selectedYear, setSelectedYear] = useState(2023);

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
        <ResponsiveContainer maxHeight="80%">
          <PieChart width="100%" height="80%">
            <Pie data={chartData2} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={100} outerRadius={120} fill="#8884d8">
              <Label value={"Total Budget: £" + budgets.filter(obj => obj.month === selectedMonth && obj.year == selectedYear)[0]["total_budget"]} position="center"/>
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
    </div>
  )
}


export default Budget