import React, { useState } from 'react'
import './CompanyFinancials.css'
import {Bar, BarChart, Line, LineChart, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts'
import { Revenues, Profits, AssetsVsLiabilities, SharePrice } from '../../../utilityFunctions/companyFinancialDataPreprocessor';
import { companyIncomeStatements, companyBalanceSheet, companySharePrice } from '../../../companyExampleData';


const CompanyFinancials = ({company, selectedChart}) => {

  let data;
  const [chartPeriod, setChartPeriod] = useState("annual");
  const [sharePricePeriod, setSharePricePeriod] = useState("one-month")

  switch (selectedChart) {
    case "Share Price":
      data = SharePrice(companySharePrice, sharePricePeriod)
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
          <form>
            <input type="radio" id='one-month-choice' value="one-month" name="chartPeriod" onClick={() => setSharePricePeriod("one-month")} defaultChecked/>
            <label htmlFor="one-month-choice" id='one-month-label'>1 Month</label>

            <input type="radio" id='six-month-choice' value="six-month" name="chartPeriod" onClick={() => setSharePricePeriod("six-month")}/>
            <label htmlFor="six-month-choice" id='six-month-label'>6 Months</label>

            <input type="radio" id='one-year-choice' value="one-year" name="chartPeriod" onClick={() => setSharePricePeriod("one-year")}/>
            <label htmlFor="one-year-choice" id='one-year-label'>1 Year</label>
          </form>
        }
      </header>
      <div className="chart-container">
        <ResponsiveContainer height="100%" width="100%">
          {selectedChart === "Share Price"
          ?
            <LineChart height="100%" width="100%" data={data} margin={{left: 10, right: 40, bottom: 50, top: 10}}>
              <XAxis dataKey="date" angle={-45} tick={{dy: 35}}/>
              <YAxis domain={['dataMin - 2', 'auto']} label={{value: "Price per Share ($USD)", angle: -90, position: "insideLeft", dy: 70}}/>
              <Tooltip />
              <Line dataKey="Share Price" stroke="#407BFF" strokeWidth={2} dot={false}/>
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