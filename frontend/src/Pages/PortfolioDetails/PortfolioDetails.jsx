import React from 'react'
import './PortfolioDetails.css'
import { Edit, Delete } from '@mui/icons-material'
import PortfolioDetailsHeader from '../../Components/PortfolioDetailsHeader/PortfolioDetailsHeader'
import PortfolioOverview from '../../Components/PortfolioOverview/PortfolioOverview'
import PortfolioDetailsNav from '../../Components/PortfolioDetailsNav/PortfolioDetailsNav'

const PortfolioDetails = () => {

  console.log("Portfolio Details Re-render")
  return (
    <section className='portfolio-details-container'>
      <PortfolioDetailsHeader />
      <PortfolioOverview />
      <PortfolioDetailsNav />
    </section>
  )
}

export default PortfolioDetails