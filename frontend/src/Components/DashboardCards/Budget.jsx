import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import DashboardBudgetForm from '../DashboardBudgetForm/DashboardBudgetForm';
import { ResponsiveContainer, PieChart, Pie, Tooltip, Label } from 'recharts';
import { budgetDataPreprocessor } from '../../utilityFunctions/budgetDataPreprocessor.js';
import { transactionDataPreprocessor } from '../../utilityFunctions/transactionDataPreprocessor.js';
import { Home, Commute, Fastfood, HomeRepairService, HealthAndSafety, DevicesOther, ConfirmationNumber, MoreHoriz } from '@mui/icons-material';

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

const budgetIconArray = [<Home />, <Commute />, <Fastfood />, <HomeRepairService />, <HealthAndSafety />, <DevicesOther />, <ConfirmationNumber />, <MoreHoriz />]

const CustomLabel = ({viewBox, budget}) => {
  const {cx, cy} = viewBox;

  return (
    <g>
      <text x={cx} y={cy - 10} textAnchor='middle'>
        Total Budget:
      </text>
      <text x={cx} y={cy + 10} textAnchor='middle'>
        £{budget}
      </text>
    </g>
  )
}

const Budget = () => {

  const [selectedMonth, setSelectedMonth] = useState("November");
  const [selectedYear, setSelectedYear] = useState(2023);

  const budgets = useSelector(state => state.budgets.budgets);
  const transactions = useSelector(state => state.bankTransactions.transactions)  

  if (budgets === null) {
    return (
      <h1>Loading...</h1>
    )
  }

  const doughnutChartData = budgetDataPreprocessor(budgets, selectedMonth, selectedYear)
  const breakdownData = transactionDataPreprocessor(transactions, selectedMonth, selectedYear)

  console.log(breakdownData)

  return (
    <div className='budget'>
        <header className='budget-header'>
          <h3>Budget</h3>
        </header>
        <DashboardBudgetForm setSelectedMonth={setSelectedMonth} setSelectedYear={setSelectedYear}/>
        <ResponsiveContainer maxHeight="80%">
          <PieChart width="100%" height="80%">
            <Pie data={doughnutChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={80} outerRadius={110} fill="#8884d8">
              <Label content={<CustomLabel budget={budgets.filter(obj => obj.month === selectedMonth && obj.year == selectedYear)[0]["total_budget"]}/>} position="center"/>
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <section className='budget-breakdown'>
          <h3>
            Budget Breakdown
          </h3>
          <ul className='budget-categories'>
            {doughnutChartData.map((category, index) => (
              <li className='budget-category'>
                <div className="category-name">
                  {budgetIconArray[index]}{category.name}
                </div>
                <div className="category-spending">
                  £{category.value}
                </div>
              </li>
            ))}
          </ul>
        </section>
    </div>
  )
}


export default Budget