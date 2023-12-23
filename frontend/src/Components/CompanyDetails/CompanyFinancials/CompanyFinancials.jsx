import React from 'react'
import './CompanyFinancials.css'
import {Bar, BarChart, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts'
import { Revenues } from '../../../utilityFunctions/companyFinancialDataPreprocessor';
import { companyIncomeStatements } from '../../../companyExampleData';


const CompanyFinancials = ({company, type}) => {

  const data = Revenues(companyIncomeStatements, "quarter")

  console.log(data)
  return (
    <div className='company-financials'>
      <h2>Revenues</h2>
      <div className="chart-container">
        <ResponsiveContainer height="100%" width="100%">
          <BarChart height="100%" width="100%" data={data}>
            <XAxis dataKey="year"/>
            <YAxis label={{value: "Amount ($)", angle: -90, position: "insideLeft"}} />
            <Tooltip />
            <Bar dataKey="revenue" fill="#407BFF" activeBar={<Rectangle />}/>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default CompanyFinancials