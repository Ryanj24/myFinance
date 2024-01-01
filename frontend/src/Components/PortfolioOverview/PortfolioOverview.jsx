import React from 'react'
import './PortfolioOverview.css'
import { useParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { portfolioIcon } from '../../utilityFunctions/portfolioIcon';
import { portfolioIcons } from '../PortfolioCard/PortfolioCard';

const PortfolioOverview = () => {
    const {id} = useParams();

    const portfolio = useSelector(state => state.portfolios.portfolios).filter(portfolio => portfolio.id == id).map(portfolio => portfolioIcon(portfolio))[0];

  return (
    <section className='details-section'>
        <div className="provider-logo-container">
            <img src={portfolioIcons[portfolio.iconIndex]} alt={portfolio.provider + " Logo"} height="100%" width="100%"/>
        </div>
        <div className="portfolio-info">
          <div className="portfolio-name">
            <Typography variant='h5' component="h5" gutterBottom>
              Portfolio Name
            </Typography>
            <Typography variant='body1' component="p">
              {portfolio.portfolio_name}
            </Typography>
          </div>
          <div className="portfolio-balance">
            <Typography variant='h5' component="h5" gutterBottom>
              Portfolio Balance
            </Typography>
            <Typography variant='body1' component="p">
              {Intl.NumberFormat("en-US", {style: "currency", currency: "GBP"}).format(portfolio.balance)}
            </Typography>
          </div>
        </div>
    </section>
  )
}

export default PortfolioOverview