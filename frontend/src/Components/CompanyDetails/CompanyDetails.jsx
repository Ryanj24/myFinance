import React from 'react'
import './CompanyDetails.css'
import { AttachMoney, Sell, HolidayVillage, Home, Cabin } from '@mui/icons-material'
import GridCarousel from '../GridCarousel/GridCarousel'
import CompanyOverview from './CompanyOverview/CompanyOverview'
import CompanyMetrics from './CompanyMetrics/CompanyMetrics'

const CompanyDetails = ({info}) => {
  const companyInfo = [<CompanyOverview company={info}/>, <CompanyMetrics company={info}/>]
  const companyFinancials = []
  return (
    <section className='company-details-container'>
        <header>
            <h2 className='company-title-ticker'>{info[0].Name} ({info[0].Symbol})</h2>
            <div className="action-btns">
              <button className='shares-buy-btn'>
                <AttachMoney /> Buy Shares
              </button>
              <button className='shares-sell-btn'>
                <Sell /> Sell Shares
              </button>
            </div>
        </header>
        <section className='company-details-grid'>
            <GridCarousel items={companyInfo}/>
        </section>
    </section>
  )
}

export default CompanyDetails