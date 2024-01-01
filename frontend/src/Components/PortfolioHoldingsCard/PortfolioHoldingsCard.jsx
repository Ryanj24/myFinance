import React from 'react'
import './PortfolioHoldingsCard.css'
import { Paper, Typography } from '@mui/material'
import { MoreHoriz } from '@mui/icons-material'

const PortfolioHoldingsCard = ({holding}) => {
  return (
    <Paper elevation={2} variant='elevation' className='holding-card'>
        <div className="holding-name">
            <Typography variant='body1' component="p">{holding.company_name} ({holding.company_ticker})</Typography>
        </div>
        <div className="holding-share-quantity">
            <Typography variant='h6' component="h6" gutterBottom>Shares Held</Typography>
            <Typography variant='body1' component="p">{holding.shares}</Typography>
        </div>
        <div className="holding-avg-purchase-price">
            <Typography variant='h6' component="h6" gutterBottom>Avg. Purchase Price</Typography>
            <Typography variant='body1' component="p">{Intl.NumberFormat("en-US", {style: "currency", currency: "USD"}).format(holding.avgPurchasePrice)}</Typography>
        </div>
        <div className="holding-options">
            <button>
                <MoreHoriz sx={{rotate: "90deg"}} />
            </button>
        </div>
    </Paper>
  )
}

export default PortfolioHoldingsCard