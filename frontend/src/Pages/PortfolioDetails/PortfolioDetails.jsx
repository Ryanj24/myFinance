import React from 'react'
import './PortfolioDetails.css'
import { Edit, Delete } from '@mui/icons-material'
import PortfolioOverview from '../../Components/PortfolioOverview/PortfolioOverview'
import PortfolioDetailsNav from '../../Components/PortfolioDetailsNav/PortfolioDetailsNav'

const PortfolioDetails = () => {
  return (
    <section className='portfolio-details-container'>
      <header className='portfolio-header'>
        <h1>
          Portfolio Overview
        </h1>
        <div className="portfolio-action-btns">
          <button className='portfolio-edit-btn'>
            <Edit /> Edit Portfolio
          </button>
          <button className='portfolio-delete-btn'>
            <Delete /> Delete Portfolio
          </button>
        </div>
      </header>
      <PortfolioOverview />
      <PortfolioDetailsNav />
    </section>
  )
}

export default PortfolioDetails