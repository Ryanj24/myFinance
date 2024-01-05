import React from 'react'
import './CompanyOverview.css'

const CompanyOverview = ({company}) => {
  return (
    <div className='company-overview'>
        <h2>Company Overview</h2>
        <div className="market-cap">
            <h3>Market Capitalization</h3>
            <p>{Intl.NumberFormat("en-US", {style: "currency", currency: "USD"}).format(company.mktCap)}</p>
        </div>
        <div className="country">
            <h3>Country</h3>
            <p>{company.country}</p>
        </div>
        <div className="sector">
            <h3>Sector</h3>
            <p>{company.sector}</p>
        </div>
        <div className="industry">
            <h3>Industry</h3>
            <p>{company.industry}</p>
        </div>
        <div className="description">
            <h3>Company Description</h3>
            <p>{company.description}</p>
        </div>
    </div>
  )
}

export default CompanyOverview