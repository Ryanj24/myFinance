import React from 'react'
import './CompanyDetails.css'
import { AttachMoney, Sell, HolidayVillage, Home, Cabin } from '@mui/icons-material'
import GridCarousel from '../GridCarousel/GridCarousel'
import CompanyOverview from './CompanyOverview/CompanyOverview'
import CompanyMetrics from './CompanyMetrics/CompanyMetrics'
import CompanyFinancials from './CompanyFinancials/CompanyFinancials'

const CompanyDetails = ({data}) => {
  const companyData = [<CompanyOverview company={data}/>, <CompanyMetrics company={data}/>, <CompanyFinancials company={data} type="quarter"/>]

  return (
    <section className='company-details-container'>
        <header>
            <h2 className='company-title-ticker'>{data[0].Name} ({data[0].Symbol})</h2>
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
            <GridCarousel companyData={companyData}/>
        </section>
    </section>
  )
}

export default CompanyDetails