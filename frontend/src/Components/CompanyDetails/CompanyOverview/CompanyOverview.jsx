import React from 'react'
import './CompanyOverview.css'

const CompanyOverview = ({company}) => {
  return (
    <div className='company-overview'>
        <h2>Company Overview</h2>
        <div className="country">
            <h3>Country</h3>
            <p>{company[0].Country}</p>
        </div>
        <div className="sector">
            <h3>Sector</h3>
            <p>{company[0].Sector}</p>
        </div>
        <div className="industry">
            <h3>Industry</h3>
            <p>{company[0].Industry}</p>
        </div>
        <div className="description">
            <h3>Company Description</h3>
            <p>{company[0].Description}</p>
        </div>
    </div>
  )
}

export default CompanyOverview