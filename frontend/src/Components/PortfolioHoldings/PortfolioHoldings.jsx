import React from 'react'
import './PortfolioHoldings.css'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { sortHoldings } from '../../redux/portfolioSlice.js'
import PortfolioHoldingsCard from '../PortfolioHoldingsCard/PortfolioHoldingsCard'
import { Typography } from '@mui/material'

const PortfolioHoldings = () => {

  const {id} = useParams()
  const dispatch = useDispatch()
  const {holdings} = useSelector(state => state.portfolios)

  const handleOnChange = (e) => {
    dispatch(sortHoldings(e.target.value))
  }

  const currentHoldings = holdings.filter(holding => holding.portfolio_id == id);

  return (
    <>
        <div className="holdings-sort">
            <label htmlFor='holdings-sort-selector'>Sort by: </label>
            <select id='holdings-sort-selector' onChange={handleOnChange}>
                <option value="nameAtoZ">Company Name (A to Z)</option>
                <option value="nameZtoA">Company Name (Z to A)</option>
                <option value="sharesLtoH">Shares Held (Lowest - Highest)</option>
                <option value="sharesHtoL">Shares Held (Highest - Lowest)</option>
                <option value="priceLtoH">Avg. Purchase Price (Lowest - Highest)</option>
                <option value="priceHtoL">Avg. Purchase Price (Highest - Lowest)</option>
            </select>
        </div>
        <section className='portfolio-holdings'>
          {currentHoldings.length > 0
          ?
            currentHoldings.map((holding, index) => (
              <PortfolioHoldingsCard 
                key={index}
                companyLogoSrc={holding.logo_src}
                companyName={holding.company_name}
                companyTicker={holding.company_ticker}
                sharesHeld={holding.quantity}
                avgPrice={holding.avg_purchase_price}
              />
            ))
          :
            <Typography variant='body1' component="p" sx={{marginTop: "20px"}}>No current holdings</Typography>
          }
        </section>
    </>
  )
}

export default PortfolioHoldings