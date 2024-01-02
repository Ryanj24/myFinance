import React, { useEffect, useState } from 'react'
import './PortfolioHoldingsCard.css'
import { Paper, Typography } from '@mui/material'
import { MoreHoriz } from '@mui/icons-material'
import HoldingCardDropdown from './HoldingCardDropdown/HoldingCardDropdown.jsx'
import PortfolioModal from '../PortfolioModal/PortfolioModal.jsx'

const PortfolioHoldingsCard = ({companyName, companyTicker, sharesHeld, avgPrice}) => {

    const [dropdownActive, setDropdownActive] = useState(false)
    const [sharesModalActive, setSharesModalActive] = useState(false)
    const [modalType, setModalType] = useState("")
    const [company, setCompany] = useState(
        {name: companyName, tickerSymbol: companyTicker, pricePerShare: "$100"}
    )


  return (
    <>
        {sharesModalActive && <PortfolioModal modalType={modalType} toggleModal={setSharesModalActive} company={company}/>}
        <Paper elevation={2} variant='elevation' className='holding-card'>
            <div className="holding-name">
                <Typography variant='h5' component="h5">{companyName} ({companyTicker})</Typography>
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
                <button onClick={() => setDropdownActive(!dropdownActive)}>
                    <MoreHoriz sx={{rotate: "90deg"}} />
                </button>
            </div>
            {dropdownActive && <HoldingCardDropdown setDropdownActive={setDropdownActive} setSharesModalActive={setSharesModalActive} setModalType={setModalType}/>}
        </Paper>
    </>
  )
}

export default PortfolioHoldingsCard