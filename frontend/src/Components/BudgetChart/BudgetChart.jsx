import React from 'react'
import './BudgetChart.css'
import { ResponsiveContainer, PieChart, Pie, Tooltip, Label, Cell, Legend } from 'recharts';
import BudgetChartLabel from '../BudgetChartLabel/BudgetChartLabel';
import BudgetChartPercentages from '../BudgetChartPercentages/BudgetChartPercentages'

const chartColours = ['#FD3C17', '#407BFF', '#FFA500', '#17FDE0', '#4EFD17', '#808080', '#FD17F6', '#C0C0C0'];

const BudgetChart = ({categorySpend, categoryTotals, formattedData, viewingPage}) => {

  const totalSpend = categorySpend.reduce((acc, currVal) => acc + currVal.amountSpent, 0)
  const totalBudget = categoryTotals.reduce((acc, currVal) => acc + currVal.total, 0)

  console.log(totalSpend)
  console.log(totalBudget)
  console.log("---")
  return (
    <ResponsiveContainer maxHeight={viewingPage === "Dashboard" ? "80%" : "50%"} style={ viewingPage === "Budget Details" ? {margin: "0 auto"} : null} width={viewingPage === "Budget Details" ? "50%" : "100%"}>
        {viewingPage === "Dashboard" && totalSpend === 0
        ?
          <PieChart width="100%" height="80%">
            <Pie data={[{category: "No Data", amountSpent: 1}]} dataKey={"amountSpent"} nameKey="category" cx="50%" cy="50%" innerRadius={80} outerRadius={110} fill="#8884d8">
              <Label content={<BudgetChartLabel spent={0} budget={totalBudget} viewingPage={viewingPage}/>} position="center"/>
            </Pie>
          </PieChart>
        : (viewingPage === "Dashboard" && totalSpend > 0)
        ?
          <PieChart width="100%" height="80%">
            <Pie data={formattedData} dataKey={"amountSpent"} nameKey="category" cx="50%" cy="50%" innerRadius={80} outerRadius={110} fill="#8884d8">
              <Label 
                content={
                  <BudgetChartLabel 
                    spent={totalSpend}
                    budget={totalBudget}
                    viewingPage={viewingPage}/>
                } 
                position="center"
              />
              {formattedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={chartColours[index]}/>
              ))}
            </Pie>
          </PieChart>
        : (viewingPage === "Budget Details" && totalBudget === 0)
        ?
          <PieChart width="100%" height="80%">
            <Pie data={[{category: "No Data", total: 1}]} dataKey={"total"} nameKey="category" cx="50%" cy="50%" innerRadius={80} outerRadius={110} fill="#8884d8">
              <Label content={<BudgetChartLabel spent={totalSpend} budget={totalBudget} viewingPage={viewingPage}/>} position="center"/>
            </Pie>
          </PieChart>
        : 
          <PieChart width="100%" height="80%">
            <Pie data={formattedData} dataKey={"total"} nameKey="category" cx="50%" cy="50%" innerRadius={70} outerRadius={110} fill="#8884d8" label={<BudgetChartPercentages />} labelLine={false}>
              <Label 
                content={
                  <BudgetChartLabel 
                    spent={totalSpend}
                    budget={totalBudget}
                    viewingPage={viewingPage}/>
                } 
                position="center"
              />

              {formattedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={chartColours[index]}/>
              ))}
            </Pie>
            <Legend verticalAlign='middle' align='right' layout='vertical' />
          </PieChart>
        }
    </ResponsiveContainer>
  )
}

export default BudgetChart