import React from 'react'
import './CompanyFinancials.css'
import {Bar, BarChart, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts'
import { Revenues, Profits, AssetsVsLiabilities } from '../../../utilityFunctions/companyFinancialDataPreprocessor';
import { companyIncomeStatements, companyBalanceSheet } from '../../../companyExampleData';


const CompanyFinancials = ({company, type}) => {

  // const data = Revenues(companyIncomeStatements, type)
  // const data = Profits(companyIncomeStatements, type)
  const data = AssetsVsLiabilities(companyBalanceSheet, type)

  return (
    <div className='company-financials'>
      <h2>Revenues</h2>
      <div className="chart-container">
        <ResponsiveContainer height="100%" width="100%">
          <BarChart height="100%" width="100%" data={data} margin={{left: 30, right: 30, bottom: 25}}>
            {type === "quarter"
            ?
              <XAxis dataKey="quarter" angle={-45} tick={{dy: 20}}/>
            :
              <XAxis dataKey="year" />
            }
            <YAxis label={{value: "Amount ($)", angle: -90, position: "insideLeft"}} />
            <Tooltip />
            <Bar dataKey="totalAssets" fill="#407BFF" activeBar={<Rectangle />}/>
            <Bar dataKey="totalLiabilities" fill="#FF0000" activeBar={<Rectangle />}/>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default CompanyFinancials