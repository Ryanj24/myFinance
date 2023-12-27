import React from 'react'
import './CompanyMetrics.css'
import { Help } from '@mui/icons-material' 
import { Tooltip } from '@mui/material'

const CompanyMetrics = ({company}) => {
  return (
    <div className='company-metrics'>
        <h2>Key Metrics</h2>
        <div className="market-cap">
            <h3>Market Capitalization 
                <Tooltip  title="Market capitalization is the total market value of all outstanding shares. It is calculated by multiplying the current share price and the total number of outstanding shares.">
                    <Help />
                </Tooltip>
            </h3>
            <p>${new Intl.NumberFormat().format(company.MarketCapitalization)}</p>
        </div>
        <div className="pe-ratio">
            <h3>
                Price-to-Earnings (P/E) Ratio
                <Tooltip title="A company's P/E ratio is an indicator of how much investors are willing to pay for a company's earnings.">
                    <Help />
                </Tooltip>
            </h3>
            <p>{company.TrailingPE}</p>
        </div>
        <div className="pb-ratio">
            <h3>
                Price-to-Book (P/B) Ratio
                <Tooltip title="A company's P/B ratio measures the value of a company by the markets relative to its book value.">
                    <Help />
                </Tooltip>
            </h3>
            <p>{company.PriceToBookRatio}</p>
        </div>
        <div className="eps">
            <h3>
                Earnings Per Share (EPS)
                <Tooltip title="A company's EPS gives investors an insight into the company's profitability on a per share basis.">
                    <Help />
                </Tooltip>
            </h3>
            <p>{company.EPS}</p>
        </div>
        <div className="de-ratio">
            <h3>
                Debt-to-Equity Ratio
                <Tooltip title="A company's debt-to-equity ratio is an indicator of a company's financial leverage. In other words, it provides an insight into how much money the company is borrowing to purchase assets that could produce future income.">
                    <Help />
                </Tooltip>
            </h3>
            <p>0.857</p>
        </div>
        <div className="roe">
            <h3>
                Return on Equity (TTM)
                <Tooltip title="A company's return on equity is an indicator of how efficiently the company can generate profits from equity capital.">
                    <Help />
                </Tooltip>
            </h3>
            <p>{company.ReturnOnEquityTTM}</p>
        </div>
    </div>
  )
}

export default CompanyMetrics