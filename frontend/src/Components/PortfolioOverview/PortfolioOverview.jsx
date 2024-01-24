import React from 'react'
import './PortfolioOverview.css'
import { useParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { portfolioIcon } from '../../utilityFunctions/portfolioIcon';

import AJBell from '../../assets/portfolio-logos-full/AJBell-full-logo.svg'
import Barclays from '../../assets/bank-logos-full/Barclays_full.svg'
import Fidelity from '../../assets/portfolio-logos-full/Fidelity-full-logo.svg'
import Freetrade from '../../assets/portfolio-logos-full/Freetrade-full-logo.svg'
import HSBC from '../../assets/bank-logos-full/HSBC_full.svg'
import Lloyds from '../../assets/bank-logos-full/Lloyds_Bank_full.svg'
import HL from '../../assets/portfolio-logos-full/HargreavesLansdown-full-logo.svg'
import JPMorgan from '../../assets/portfolio-logos-full/JP-Morgan-full-logo.svg'
import MorganStanley from '../../assets/portfolio-logos-full/Morgan_Stanley_Logo_1.svg'
import NatWest from '../../assets/bank-logos-full/NatWest.svg'
import RBS from '../../assets/bank-logo-icons/RBS_icon.svg'
import Santander from '../../assets/bank-logos-full/Santander_full.svg'
import Trading212 from '../../assets/portfolio-logos-full/Trading212-full-logo.svg'
import Vanguard from '../../assets/portfolio-logos-full/Vanguard-full-logo.svg'
import { AccountBalance } from '@mui/icons-material'

const portfolioFullLogos = [AJBell, Barclays, Fidelity, Freetrade, HL, HSBC, Lloyds, JPMorgan, MorganStanley, NatWest, RBS, Santander, Trading212, Vanguard, <AccountBalance />]

const PortfolioOverview = () => {
    const {id} = useParams();

    const portfolio = useSelector(state => state.portfolios.portfolios).filter(portfolio => portfolio.id == id).map(portfolio => portfolioIcon(portfolio))[0];

    if (!portfolio) {
      return (
        <h1>Loading...</h1>
      )
    }

  return (
    <section className='portfolio-details-section'>
        <div className="provider-logo-container">
            {portfolio && portfolio.iconIndex === 14
              ?
                <>{portfolioFullLogos[portfolio.iconIndex]}</>
              : 
              (portfolio && portfolio.iconIndex !== 14)
              ?
                <img src={portfolioFullLogos[portfolio.iconIndex]} alt={portfolio.provider + " Logo"} height="100%" width="100%"/>
              :
                null
            }
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
              Available Funds
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