import React, { useState } from 'react'
import './CompanyDetails.css'
import { AttachMoney, Sell, HolidayVillage, Home, Cabin } from '@mui/icons-material'
import GridCarousel from '../GridCarousel/GridCarousel'
import CompanyOverview from './CompanyOverview/CompanyOverview'
import CompanyMetrics from './CompanyMetrics/CompanyMetrics'
import CompanyFinancials from './CompanyFinancials/CompanyFinancials'
import PortfolioModal from '../PortfolioModal/PortfolioModal'

const CompanyDetails = ({data}) => {

  const [sharesModalActive, setSharesModalActive] = useState(false)
  const [modalType, setModalType] = useState("");

  const companyData = [
    <CompanyOverview company={data["overviewData"]}/>, 
    <CompanyMetrics company={data["overviewData"]}/>, 
    <CompanyFinancials company={data["sharePrice"]} selectedChart="Share Price"/>,
    <CompanyFinancials company={data["incomeStatement"]} selectedChart="Revenues"/>,
    <CompanyFinancials company={data["incomeStatement"]} selectedChart="Net Income"/>,
    <CompanyFinancials company={data["balanceSheet"]} selectedChart="Assets vs Liabilities"/>
  ]

  // console.log(data)
  return (
    <>
      {sharesModalActive && <PortfolioModal modalType={modalType} toggleModal={setSharesModalActive}/>}
      <section className='company-details-container'>
          <header>
              <h2 className='company-title-ticker'>{data["overviewData"].Name} ({data["overviewData"].Symbol})</h2>
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