import React, { useState } from 'react'
import './CompanyFinancials.css'
import {Bar, BarChart, Line, LineChart, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts'
import { Revenues, Profits, AssetsVsLiabilities, SharePrice } from '../../../utilityFunctions/companyFinancialDataPreprocessor';
import { companyIncomeStatements, companyBalanceSheet, companySharePrice } from '../../../companyExampleData';


const CompanyFinancials = ({company, selectedChart}) => {

  let data;
  const [chartPeriod, setChartPeriod] = useState("annual");

  switch (selectedChart) {
    case "Share Price":
      data = SharePrice(companySharePrice)
      break
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

  console.log(data)

  return (
    <div className='company-financials'>
      <header>
        <h2>{selectedChart}</h2>
        {selectedChart != "Share Price"
        ?
          <form>
            <input type="radio" id='annual-choice' value="annual" name="chartPeriod" onClick={() => setChartPeriod("annual")} defaultChecked/>
            <label htmlFor="annual-choice" id='annual-label'>Annual</label>

            <input type="radio" id='quarterly-choice' value="quarter" name="chartPeriod" onClick={() => setChartPeriod("quarterly")}/>
            <label htmlFor="quarterly-choice" id='quarterly-label'>Quarterly</label>
          </form>
        :
          null
        }
      </header>
      <div className="chart-container">
        <ResponsiveContainer height="100%" width="100%">
          {selectedChart === "Share Price"
          ?
            <LineChart height="100%" width="100%" data={data} margin={{left: 30, right: 10, bottom: 35, top: 25}}>
              <XAxis dataKey="date" angle={-45} tick={{dy: 20}}/>
              <YAxis domain={['dataMin - 10', 'dataMax + 10']}/>
              <Tooltip />
              <Line dataKey="Share Price" stroke="#407BFF"/>
            </LineChart>
          :
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
                <Bar dataKey="Revenue" fill="#407BFF" activeBar={<Rectangle />}/>
              :
              (selectedChart === "Net Income")
              ?
                <Bar dataKey="Net Income" fill="#407BFF" activeBar={<Rectangle />}/>
              :
                <>
                  <Bar dataKey="Total Assets" fill="#407BFF" activeBar={<Rectangle />}/>
                  <Bar dataKey="Total Liabilities" fill="#FF0000" activeBar={<Rectangle />}/>
                </>
              }
            </BarChart>
          }
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default CompanyFinancials