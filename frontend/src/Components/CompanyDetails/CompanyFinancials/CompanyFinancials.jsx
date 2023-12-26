import React, { useState } from 'react'
import './CompanyFinancials.css'
import {Bar, BarChart, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts'
import { Revenues, Profits, AssetsVsLiabilities } from '../../../utilityFunctions/companyFinancialDataPreprocessor';
import { companyIncomeStatements, companyBalanceSheet } from '../../../companyExampleData';


const CompanyFinancials = ({company, selectedChart}) => {

  let data;
  const [chartPeriod, setChartPeriod] = useState("annual");

  switch (selectedChart) {
    case "Revenues":
      data = Revenues(companyIncomeStatements, chartPeriod)
      break
    case "Net Income":
      data = Profits(companyIncomeStatements, chartPeriod)
      break
    case "Assets vs Liabilities":    
      data = AssetsVsLiabilities(companyBalanceSheet, chartPeriod)
      break
    default:
      break
  }

  return (
    <div className='company-financials'>
      <header>
        <h2>{selectedChart}</h2>
        <form>
          <input type="radio" id='annual-choice' value="annual" name="chartPeriod" onClick={() => setChartPeriod("annual")}/>
          <label htmlFor="annual-choice" id='annual-label'>Annual</label>

          <input type="radio" id='quarterly-choice' value="quarter" name="chartPeriod" onClick={() => setChartPeriod("quarterly")}/>
          <label htmlFor="quarterly-choice" id='quarterly-label'>Quarterly</label>
        </form>
      </header>
      <div className="chart-container">
        <ResponsiveContainer height="100%" width="100%">
          <BarChart height="100%" width="100%" data={data} margin={{left: 30, right: 10, bottom: 25, top: 25}}>
            {chartPeriod === "quarterly"
            ?
              <XAxis dataKey="quarter" angle={-45} tick={{dy: 20}}/>
            :
              <XAxis dataKey="year" />
            }
            <YAxis label={{value: "Millions ($USD)", angle: -90, position: "insideLeft", dy: 40, dx: -20}} />
            <Tooltip />
            {selectedChart === "Revenues"
            ? 
              <Bar dataKey="revenue" fill="#407BFF" activeBar={<Rectangle />}/>
            :
            (selectedChart === "Net Income")
            ?
              <Bar dataKey="netIncome" fill="#407BFF" activeBar={<Rectangle />}/>
            :
              <>
                <Bar dataKey="totalAssets" fill="#407BFF" activeBar={<Rectangle />}/>
                <Bar dataKey="totalLiabilities" fill="#FF0000" activeBar={<Rectangle />}/>
              </>
            }
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default CompanyFinancials