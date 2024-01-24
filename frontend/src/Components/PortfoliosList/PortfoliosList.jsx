import React from 'react'
import './PortfoliosList.css'
import { useSelector } from 'react-redux'
import { portfolioIcon } from '../../utilityFunctions/portfolioIcon'
import PortfolioCard from '../PortfolioCard/PortfolioCard'

const PortfoliosList = () => {

  const {portfolios} = useSelector(state => state.portfolios)

  return (
    <section className='portfolios-list'>
        {portfolios.length > 0
        ?
          portfolios.map((portfolio) => portfolioIcon(portfolio)).map((portfolio) => (
              <PortfolioCard 
              key={portfolio.id}
              portfolio={portfolio}
              />
          ))
        :
          <p>No portfolios currently added</p>
        }
    </section>
  )
}

export default PortfoliosList