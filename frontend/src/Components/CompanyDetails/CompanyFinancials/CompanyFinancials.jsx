import React, { useEffect, useState } from 'react'
import './CompanyFinancials.css'
import { MoreHoriz } from '@mui/icons-material';
import { useMediaQuery } from 'react-responsive';
import {Bar, BarChart, Line, LineChart, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts'
import { Revenues, Profits, AssetsVsLiabilities, SharePrice } from '../../../utilityFunctions/companyFinancialDataPreprocessor';
import ChartPeriodSelectors from './ChartPeriodSelectors.jsx';


const CompanyFinancials = ({company, selectedChart}) => {

  let data;
  const [chartPeriod, setChartPeriod] = useState("annual");
  const [sharePricePeriod, setSharePricePeriod] = useState("one-month")
  const [dropdownActive, setDropdownActive] = useState(false)

  switch (selectedChart) {
    case "Share Price":
      data = SharePrice(company, sharePricePeriod)
      break
    case "Revenues":
      data = Revenues(company, chartPeriod)
      break
    case "Net Income":
      data = Profits(company, chartPeriod)
      break
    case "Assets vs Liabilities":    
      data = AssetsVsLiabilities(company, chartPeriod)
      break
    default:
      break
  }

  const smallerScreen = useMediaQuery({ query: '(max-width: 800px)' })

  return (
    <div className='company-financials'>
      <header>
        <h2>{selectedChart}</h2>
        {smallerScreen 
        ?
          <button className='selector-dropdown-btn' onClick={() => setDropdownActive(!dropdownActive)}>
            <MoreHoriz />
          </button>
        :
          (selectedChart != "Share Price")
        ?
          <ChartPeriodSelectors chartPeriod={chartPeriod} setChartPeriod={setChartPeriod}/>
        :
          <ChartPeriodSelectors chartType="Share Price" sharePricePeriod={sharePricePeriod} setSharePricePeriod={setSharePricePeriod}/>
        }
        {dropdownActive && selectedChart != "Share Price"
        ?
          <ChartPeriodSelectors chartPeriod={chartPeriod} setChartPeriod={setChartPeriod}/>
        : (dropdownActive && selectedChart === "Share Price")
        ?
          <ChartPeriodSelectors chartType="Share Price" sharePricePeriod={sharePricePeriod} setSharePricePeriod={setSharePricePeriod}/>
        :
          null
        }
      </header>

      <div className="chart-container">
        <ResponsiveContainer height="100%" width="100%">
          {selectedChart === "Share Price"
          ?
            <LineChart height="100%" width="100%" data={data} margin={{left: 10, right: 40, bottom: 50, top: 10}}>
              <XAxis dataKey="date" angle={-45} tick={{dy: 35}}/>
              <YAxis domain={['dataMin - 2', 'auto']} label={{value: "Price per Share ($USD)", angle: -90, position: "insideLeft", dy: 70}}/>
              <Tooltip formatter={(val) => Intl.NumberFormat("en", {style: "currency", currency: "USD"}).format(val)}/>
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
              <Tooltip formatter={(val) => Intl.NumberFormat("en", {style: "currency", currency: "USD"}).format(val)}/>
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