import React from 'react'
import './BudgetChart.css'
import { ResponsiveContainer, PieChart, Pie, Tooltip, Label, Cell } from 'recharts';
import BudgetChartLabel from '../BudgetChartLabel/BudgetChartLabel';

const chartColours = ['#FD3C17', '#407BFF', '#FFA500', '#17FDE0', '#4EFD17', '#808080', '#FD17F6', '#C0C0C0'];

const BudgetChart = ({categorySpend, categoryTotals, formattedData}) => {
  return (
    <ResponsiveContainer maxHeight="80%">
            {categorySpend.reduce((acc, currVal) => acc + currVal.amountSpent, 0) === 0
            ?
              <PieChart width="100%" height="80%">
                <Pie data={[{category: "No Data", amountSpent: 1}]} dataKey="amountSpent" nameKey="category" cx="50%" cy="50%" innerRadius={80} outerRadius={110} fill="#8884d8">
                  <Label content={<BudgetChartLabel spent={0} budget={categoryTotals.reduce((acc, currVal) => acc + currVal.total, 0)}/>} position="center"/>
                </Pie>
              </PieChart>
            :
              <PieChart width="100%" height="80%">
                <Pie data={formattedData} dataKey="amountSpent" nameKey="category" cx="50%" cy="50%" innerRadius={80} outerRadius={110} fill="#8884d8">
                  <Label 
                    content={
                      <BudgetChartLabel 
                        spent={categorySpend.reduce((acc, currVal) => acc + currVal.amountSpent, 0)}
                        budget={categoryTotals.reduce((acc, currVal) => acc + currVal.total, 0)}/>
                    } 
                    position="center"
                  />
                  {formattedData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={chartColours[index]}/>
                  ))}
                </Pie>
              </PieChart>
            }
        </ResponsiveContainer>
  )
}

export default BudgetChart