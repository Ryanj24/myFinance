import React, { useEffect } from 'react'
import {Bar, BarChart, Rectangle, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, Text} from 'recharts'
import { useSelector } from 'react-redux'
import { incomeDataPreprocessor } from '../../utilityFunctions/incomeDataPreprocessor'

const data = [
    {
        month: "Jan",
        amount: 0
    },
    {
        month: "Feb",
        amount: 0
    },
    {
        month: "Mar",
        amount: 0
    },
    {
        month: "Apr",
        amount: 0
    },
    {
        month: "May",
        amount: 0
    },
    {
        month: "Jun",
        amount: 0
    },
    {
        month: "Jul",
        amount: 0
    },
    {
        month: "Aug",
        amount: 0
    },
    {
        month: "Sep",
        amount: 0
    },
    {
        month: "Oct",
        amount: 0
    },
    {
        month: "Nov",
        amount: 0
    },
    {
        month: "Dec",
        amount: 0
    }

]

const yearlyIncome = [
    {
        month: "Jan",
        amount: 0
    },
    {
        month: "Feb",
        amount: 0
    },
    {
        month: "Mar",
        amount: 0
    }
]

const IncomeChart = () => {

    const transactions = useSelector(state => state.bankTransactions.transactions)

    if (transactions === null) {
        return (
            <h1>Loading...</h1>
        )
    }

    const yearlyIncome = incomeDataPreprocessor(transactions)


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
                <XAxis dataKey="month"/>
                <YAxis/>
                <Tooltip />
                <Bar dataKey="amount" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
            </BarChart>
        </ResponsiveContainer>
    </div>
  )
}

export default IncomeChart