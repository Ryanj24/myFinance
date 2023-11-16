import React from 'react'
import {Bar, BarChart, Rectangle, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend} from 'recharts'

const data = [
    {
        name: "Jan",
        income: 2000
    },
    {
        name: "Feb",
        income: 3000
    },
    {
        name: "Mar",
        income: 1000
    },
    {
        name: "Apr",
        income: 2500
    },
    {
        name: "May",
        income: 1950
    },
    {
        name: "Jun",
        income: 2200
    },
    {
        name: "Jul",
        income: 2000
    },
    {
        name: "Aug",
        income: 2500
    },
    {
        name: "Sep",
        income: 3000
    },
    {
        name: "Oct",
        income: 1900
    },
    {
        name: "Nov",
        income: 2100
    },
    {
        name: "Dec",
        income: 1750
    }

]

const IncomeChart = () => {
  return (
    <div className='income-chart'>
        <header className='income-chart-header'>
            <h3>Income per Month</h3>
        </header>
        <ResponsiveContainer width="100%" height="90%">
            <BarChart 
                width="100%"
                height="100%"
                data={data}
                margin={{top: 50}}
                
            >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="income" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
            </BarChart>
        </ResponsiveContainer>
    </div>
  )
}

export default IncomeChart