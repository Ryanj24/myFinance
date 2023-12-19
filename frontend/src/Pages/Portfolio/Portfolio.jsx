import React from 'react'
import './Portfolio.css'
import { Add } from '@mui/icons-material'
import PortfolioSort from '../../Components/PortfolioSort/PortfolioSort'
import PortfoliosList from '../../Components/PortfoliosList/PortfoliosList'

const Portfolio = () => {
  return (
    <>
      <section className='portfolios-container'>
        <header className='portfolios-header'>
          <h1>Stock Portfolios</h1>
          <div className="portfolios-action-btn">
            <button className='create-portfolio-btn'>
              <Add /> Create Portfolio
            </button>
          </div>
        </header>

        <PortfolioSort />
        <PortfoliosList />

      </section>
    </>
  )
}

export default Portfolio