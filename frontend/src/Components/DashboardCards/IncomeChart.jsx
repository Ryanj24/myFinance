import React, { useEffect } from 'react'
import {Bar, BarChart, Rectangle, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, Text} from 'recharts'
import { useSelector } from 'react-redux'
import { incomeDataPreprocessor } from '../../utilityFunctions/incomeDataPreprocessor'


const IncomeChart = () => {

    const transactions = useSelector(state => state.bankTransactions.transactions)

    if (transactions === null) {
        return (
            <h1>Loading...</h1>
        )
    }

    const yearlyIncome = incomeDataPreprocessor(transactions)

    console.log(yearlyIncome)


  return (
    <div className='income-chart'>
        <header className='income-chart-header'>
            <h3>Income per Month</h3>
        </header>
        <ResponsiveContainer width="100%" height="90%">
            <BarChart 
                width="100%"
                height="100%"
                data={yearlyIncome}
                margin={{top: 50}}
                
            >
                <XAxis dataKey="month"/>
                <YAxis domain={[0, 5000]}/>
                <Tooltip />
                <Bar dataKey="amount" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
            </BarChart>
        </ResponsiveContainer>
    </div>
  )
}

export default IncomeChart