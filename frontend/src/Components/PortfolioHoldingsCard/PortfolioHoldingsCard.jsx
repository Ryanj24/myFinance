import React, { useEffect, useState } from 'react'
import './PortfolioHoldingsCard.css'
import { Paper, Typography } from '@mui/material'
import { MoreHoriz } from '@mui/icons-material'
import { fetchCompanyLogo } from '../../../../backend/utilityFunctions/fetchCompanyData'

const PortfolioHoldingsCard = ({companyName, companyTicker, sharesHeld, avgPrice}) => {


  return (
    <Paper elevation={2} variant='elevation' className='holding-card'>
        <div className="holding-name">
            <Typography variant='body1' component="p">{companyName} ({companyTicker})</Typography>
        </div>
        <div className="holding-share-quantity">
            <Typography variant='h6' component="h6" gutterBottom>Shares Held</Typography>
            <Typography variant='body1' component="p">{sharesHeld}</Typography>
        </div>
        <div className="holding-avg-purchase-price">
            <Typography variant='h6' component="h6" gutterBottom>Avg. Purchase Price</Typography>
            <Typography variant='body1' component="p">{Intl.NumberFormat("en-US", {style: "currency", currency: "USD"}).format(avgPrice)}</Typography>
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