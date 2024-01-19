import React from 'react'
import './PortfolioCard.css'
import { Link } from 'react-router-dom'
import { Icon, Typography } from '@mui/material'
import { ArrowForward } from '@mui/icons-material'

import AJBell from '../../assets/portfolio-logo-icons/AJBell-icon-logo.svg'
import Barclays from '../../assets/bank-logo-icons/Barclays_icon.svg'
import Fidelity from '../../assets/portfolio-logo-icons/Fidelity-icon-logo.png'
import Freetrade from '../../assets/portfolio-logo-icons/Freetrade-icon-logo.png'
import HSBC from '../../assets/bank-logo-icons/HSBC_icon.svg'
import Lloyds from '../../assets/bank-logo-icons/LloydsBank_icon.svg'
import HL from '../../assets/portfolio-logos-full/HargreavesLansdown-full-logo.svg'
import JPMorgan from '../../assets/portfolio-logos-full/JP-Morgan-full-logo.svg'
import MorganStanley from '../../assets/portfolio-logos-full/Morgan_Stanley_Logo_1.svg'
import NatWest from '../../assets/bank-logos-full/NatWest.svg'
import RBS from '../../assets/bank-logo-icons/RBS_icon.svg'
import Santander from '../../assets/bank-logo-icons/Santander_icon.svg'
import Trading212 from '../../assets/portfolio-logo-icons/Trading212-icon-logo.svg'
import Vanguard from '../../assets/portfolio-logo-icons/Vanguard-icon-logo.svg'


export const portfolioIcons = [AJBell, Barclays, Fidelity, Freetrade, HL, HSBC, Lloyds, JPMorgan, MorganStanley, NatWest, RBS, Santander, Trading212, Vanguard]

const PortfolioCard = ({portfolio}) => {
  return (
    <div className='portfolio-card'>
        <div className="portfolio-logo-container">
            <Icon><img src={portfolioIcons[portfolio.iconIndex]} alt="portfolio Logo" height="100%" width="100%"/></Icon>
        </div>
        <div className="portfolio-name">
            <Typography variant='h5' component="h5">{portfolio.portfolio_name}</Typography>
        </div>
        <div className="portfolio-value">
            <Typography variant='h6' component="h6" gutterBottom>Available Funds</Typography>
            <Typography variant='body2' component="p">{Intl.NumberFormat("en-US", {style: "currency", currency: "GBP"}).format(portfolio.balance)}</Typography>
        </div>
        <div className="view-portfolio-icon-container">
            <Link className='view-portfolio-btn' to={`/home/portfolios/${portfolio.id}`}>
                <ArrowForward />
            </Link>
        </div>
    </div>
  )
}

export default PortfolioCard