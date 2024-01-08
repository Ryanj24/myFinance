import React, { useEffect, useState } from 'react'
import './CompanyDetails.css'
import { AttachMoney, Sell, HolidayVillage, Home, Cabin } from '@mui/icons-material'
import GridCarousel from '../GridCarousel/GridCarousel'
import CompanyOverview from './CompanyOverview/CompanyOverview'
import CompanyMetrics from './CompanyMetrics/CompanyMetrics'
import CompanyFinancials from './CompanyFinancials/CompanyFinancials'
import PortfolioModal from '../PortfolioModal/PortfolioModal'
import { dateFormatter } from '../../utilityFunctions/dateFormatter'

const CompanyDetails = ({data}) => {

  const [sharesModalActive, setSharesModalActive] = useState(false)
  const [modalType, setModalType] = useState("");

  const companyData = [
    <CompanyOverview company={data["overviewData"]}/>, 
    <CompanyMetrics companyRatios={data["ratios"]} companyBalanceSheet={data["balanceSheet"]["annualReports"]} companyIncomeStatement={data["incomeStatement"]["annualReports"]}/>, 
    <CompanyFinancials company={data["sharePrice"]} selectedChart="Share Price"/>,
    <CompanyFinancials company={data["incomeStatement"]} selectedChart="Revenues"/>,
    <CompanyFinancials company={data["incomeStatement"]} selectedChart="Net Income"/>,
    <CompanyFinancials company={data["balanceSheet"]} selectedChart="Assets vs Liabilities"/>
  ]

  return (
    <>
      {sharesModalActive && <PortfolioModal modalType={modalType} toggleModal={setSharesModalActive} company={data["overviewData"]}/>}
      <section className='company-details-container'>
          <header>
            <div className="company-header">
              {data["overviewData"].image
              ?
                <div className="company-logo">
                  <img src={data["overviewData"].image} alt={`${data["overviewData"].symbol} logo`} />
                </div>
              :
                null
              }
              <div className="company-name-price">
                <h2 className='company-name-ticker'>{data["overviewData"].companyName} ({data["overviewData"].symbol})</h2>
                <div className="company-share-price">
                  <h3>{Intl.NumberFormat("en-US", {style: "currency", currency: "USD"}).format(data["overviewData"].price)}</h3>
                  <p>(As of {dateFormatter(data["sharePrice"][0].date, "ddmmyy")})</p>
                </div>
              </div>
            </div>
            <div className="action-btns">
              <button className='shares-buy-btn' onClick={() => {
                setSharesModalActive(true)
                setModalType("Buy Shares")
              }}>
                <AttachMoney /> Buy Shares
              </button>
              <button className='shares-sell-btn' onClick={() => {
                setSharesModalActive(true)
                setModalType("Sell Shares")
              }}>
                <Sell /> Sell Shares
              </button>
            </div>
          </header>
          <section className='company-details-grid'>
              <GridCarousel companyData={companyData}/>
          </section>
      </section>
    </>
  )
}

export default CompanyDetails