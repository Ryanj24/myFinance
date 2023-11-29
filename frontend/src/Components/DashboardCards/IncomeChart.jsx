import React, { useEffect, useState } from 'react'
import {useForm} from 'react-hook-form'
import {ArrowRightAlt} from '@mui/icons-material'
import {Bar, BarChart, Rectangle, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, Text} from 'recharts'
import { useSelector } from 'react-redux'
import { incomeDataPreprocessor } from '../../utilityFunctions/incomeDataPreprocessor'


const IncomeChart = () => {

    const [selectedYear, setSelectedYear] = useState(2020);
    const {register, handleSubmit} = useForm();
    const transactions = useSelector(state => state.bankTransactions.transactions)


    if (transactions === null) {
        return (
            <h1>Loading...</h1>
        )
    }

    const yearlyIncome = incomeDataPreprocessor(transactions, selectedYear)

    const onSubmit = async (data, e) => {
        e.preventDefault();
        setSelectedYear(parseInt(data["year-selector"], 10))
    }



  return (
    <div className='income-chart'>
        <header className='income-chart-header'>
            <h3>Income per Month</h3>
        </header>
        <form id='income-year-selector-form' onSubmit={handleSubmit(onSubmit)}>
            <select name="year" id="year-selector" {...register("year-selector")}>
                <option value="2020">2020</option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
            </select>
            <button type="submit">
                <ArrowRightAlt />
            </button>
        </form>
        <ResponsiveContainer width="100%" height="80%">
            <BarChart 
                width="100%"
                height="100%"
                data={yearlyIncome}
                margin={{top: 20, bottom: 10, left: 20, right: 20}}
                
            >
                <XAxis dataKey="month"/>
                <YAxis domain={[0, 5000]} ticks={[0, 1000, 2000, 3000, 4000, 5000]} label={{value: "GBP (£)", angle: -90, position: "insideLeft"}}/>
                <Tooltip />
                <Bar dataKey="amount" fill="#407BFF" activeBar={<Rectangle/>} />
            </BarChart>
        </ResponsiveContainer>
    </div>
  )
}

export default IncomeChart