import React from 'react'
import './CompanyMetrics.css'

const CompanyMetrics = ({company}) => {
  return (
    <div className='company-metrics'>
        <h2>Key Metrics</h2>
        <div className="market-cap">
            <h3>Market Capitalization</h3>
            <p>${company[0].MarketCapitalization}</p>
        </div>
        <div className="pe-ratio">
            <h3>Price-to-Earnings (P/E) Ratio</h3>
            <p>{company[0].ForwardPE}</p>
        </div>
        <div className="pb-ratio">
            <h3>Price-to-Book (P/B) Ratio</h3>
            <p>{company[0].PriceToBookRatio}</p>
        </div>
        <div className="eps">
            <h3>Earnings Per Share (EPS)</h3>
            <p>{company[0].EPS}</p>
        </div>
        <div className="de-ratio">
            <h3>Debt-to-Equity Ratio</h3>
            <p>0.857</p>
        </div>
        <div className="roe">
            <h3>Return on Equity (TTM)</h3>
            <p>{company[0].ReturnOnEquityTTM}</p>
        </div>
    </div>
  )
}

export default CompanyMetrics