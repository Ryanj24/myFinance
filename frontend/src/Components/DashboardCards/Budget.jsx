import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import DashboardBudgetForm from '../DashboardBudgetForm/DashboardBudgetForm';
import { ResponsiveContainer, PieChart, Pie, Tooltip, Label, Cell } from 'recharts';
import { budgetDataPreprocessor } from '../../utilityFunctions/budgetDataPreprocessor.js';
import { transactionDataPreprocessor } from '../../utilityFunctions/transactionDataPreprocessor.js';
import { Home, Commute, Fastfood, HomeRepairService, HealthAndSafety, DevicesOther, ConfirmationNumber, MoreHoriz } from '@mui/icons-material';
import { joinArraysOfObjects } from '../../utilityFunctions/joinArraysOfObjects.js';

let chartData = [
  { category: 'Housing', amount: 0},
  { category: 'Transportation', amount: 0},
  { category: 'Food', amount: 0},
  { category: 'Utilities', amount: 0},
  { category: 'Medical & Healthcare', amount: 0},
  { category: 'Personal', amount: 0},
  { category: 'Entertainment', amount: 0},
  { category: 'Other', amount: 0},
]

const budgetIconArray = [<Home sx={{color: '#FD3C17'}}/>, <Commute sx={{color: '#407BFF'}}/>, <Fastfood sx={{color: '#FFA500'}}/>, <HomeRepairService sx={{color: '#17FDE0'}}/>, <HealthAndSafety sx={{color: '#4EFD17'}}/>, <DevicesOther sx={{color: '#808080'}}/>, <ConfirmationNumber sx={{color: '#FD17F6'}}/>, <MoreHoriz sx={{color: '#C0C0C0'}}/>]

const CustomLabel = ({viewBox, budget}) => {
  const {cx, cy} = viewBox;

  return (
    <g>
      <text x={cx} y={cy - 10} textAnchor='middle'>
        Total Spent:
      </text>
      <text x={cx} y={cy + 10} textAnchor='middle'>
        £{budget}
      </text>
    </g>
  )
}

const chartColours = ['#FD3C17', '#407BFF', '#FFA500', '#17FDE0', '#4EFD17', '#808080', '#FD17F6', '#C0C0C0'];

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
        <ResponsiveContainer maxHeight="80%">
            {categoryAmountSpent.reduce((acc, currVal) => acc + currVal.amountSpent, 0) === 0
            ?
              <PieChart width="100%" height="80%">
                <Pie data={[{category: "No Data", amountSpent: 1}]} dataKey="amountSpent" nameKey="category" cx="50%" cy="50%" innerRadius={80} outerRadius={110} fill="#8884d8">
                  <Label content={<CustomLabel budget={0}/>} position="center"/>
                </Pie>
              </PieChart>
            :
              <PieChart width="100%" height="80%">
                <Pie data={joinedData} dataKey="amountSpent" nameKey="category" cx="50%" cy="50%" innerRadius={80} outerRadius={110} fill="#8884d8">
                  <Label content={<CustomLabel budget={categoryAmountSpent.reduce((acc, currVal) => acc + currVal.amountSpent, 0)}/>} position="center"/>
                  {joinedData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={chartColours[index]}/>
                  ))}
                </Pie>
              </PieChart>
            }
        </ResponsiveContainer>
        <section className='budget-breakdown'>
          <h3>
            Budget Breakdown
          </h3>
          <ul className='budget-categories'>
            {joinedData.map((obj, index) => (
              <li className='budget-category'>
                <div className="category-name">
                  {budgetIconArray[index]}{obj.category}
                </div>
                <div className="category-spending">
                  £{obj.amountSpent}
                </div>
              </li>
            ))}
          </ul>
        </section>
    </div>
  )
}


export default Budget