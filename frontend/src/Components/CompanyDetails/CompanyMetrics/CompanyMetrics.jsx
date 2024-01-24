import React from 'react'
import './CompanyMetrics.css'
import { Help } from '@mui/icons-material' 
import { Tooltip } from '@mui/material'

const CompanyMetrics = ({companyRatios, companyBalanceSheet, companyIncomeStatement}) => {
  return (
    <div className='company-metrics'>
        <h2>Key Metrics</h2>
        <div className="pe-ratio">
            <h3>
                Price-to-Earnings (P/E) Ratio (TTM)
                <Tooltip title="A company's P/E ratio is an indicator of how much investors are willing to pay for a company's earnings.">
                    <Help />
                </Tooltip>
            </h3>
            <p>{(+companyRatios.peRatioTTM).toFixed(2)}</p>
        </div>
        <div className="gross-profit-margin">
            <h3>
                Gross Profit Margin (TTM)
                <Tooltip title="A company's gross profit margin measures how much profit the company generates after accounting for the cost of goods sold (COGS).">
                    <Help />
                </Tooltip>
            </h3>
            <p>{(+companyRatios.grossProfitMarginTTM).toFixed(2)}</p>
        </div>
        <div className="pb-ratio">
            <h3>
                Price-to-Book (P/B) Ratio (TTM)
                <Tooltip title="A company's P/B ratio measures the value of a company by the markets relative to its book value.">
                    <Help />
                </Tooltip>
            </h3>
            <p>{(+companyRatios.priceToBookRatioTTM).toFixed(2)}</p>
        </div>
        <div className="eps">
            <h3>
                Earnings Per Share (EPS) (TTM)
                <Tooltip title="A company's EPS gives investors an insight into the company's profitability on a per share basis.">
                    <Help />
                </Tooltip>
            </h3>
            <p>{Intl.NumberFormat("en-US", {style: "currency", currency: "USD"}).format(companyIncomeStatement[0].netIncome / companyBalanceSheet[0].commonStockSharesOutstanding)}</p>
        </div>
        <div className="de-ratio">
            <h3>
                Debt-to-Equity Ratio (TTM)
                <Tooltip title="A company's debt-to-equity ratio is an indicator of a company's financial leverage. In other words, it provides an insight into how much money the company is borrowing to purchase assets that could produce future income.">
                    <Help />
                </Tooltip>
            </h3>
            <p>{(+companyRatios.debtEquityRatioTTM).toFixed(2)}</p>
        </div>
        <div className="roa">
            <h3>
                Return on Assets (TTM)
                <Tooltip title="A company's return on assets measures how profitable the company is in relation to its total assets. In other words, how efficient the company is at managing its balance sheet to generate profits.">
                    <Help />
                </Tooltip>
            </h3>
            <p>{(+companyRatios.returnOnAssetsTTM).toFixed(2)}</p>
        </div>
        <div className="roe">
            <h3>
                Return on Equity (TTM)
                <Tooltip title="A company's return on equity is an indicator of how efficiently the company can generate profits from equity capital.">
                    <Help />
                </Tooltip>
            </h3>
            <p>{(+companyRatios.returnOnEquityTTM).toFixed(2)}</p>
        </div>
        <div className="dividend-yield">
            <h3>
                Dividend Yield (%) (TTM)
                <Tooltip title="A company's dividend yield shows how much the company pays out in dividends each year relative to its stock price as a percentage.">
                    <Help />
                </Tooltip>
            </h3>
            <p>{(+companyRatios.dividendYielPercentageTTM).toFixed(2)}%</p>
        </div>
    </div>
  )
}

export default CompanyMetrics