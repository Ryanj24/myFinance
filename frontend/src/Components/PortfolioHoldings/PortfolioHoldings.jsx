import React, { useEffect, useState } from 'react'
import './PortfolioHoldings.css'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setHoldings, sortHoldings } from '../../redux/portfolioSlice.js'
import { calculateHoldings } from '../../utilityFunctions/calculateHoldings'
import PortfolioHoldingsCard from '../PortfolioHoldingsCard/PortfolioHoldingsCard'
import { sortStrings } from '../../utilityFunctions/sortStrings'
import { Typography } from '@mui/material'

const PortfolioHoldings = () => {

  const {id} = useParams()
  const dispatch = useDispatch()
  const userToken = useSelector(state => state.user.user.token)
  const {holdings} = useSelector(state => state.portfolios)
  const {transactions} = useSelector(state => state.stockTransactions)

  const handleOnChange = (e) => {
    dispatch(sortHoldings(e.target.value))
  }

  useEffect(() => {
    async function holdings() {
      const holdingsArr = await calculateHoldings(id, userToken, transactions)
      dispatch(setHoldings(holdingsArr))
    }
    holdings()
  }, [])
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
          {holdings
          ?
            holdings.map(holding => (
              <PortfolioHoldingsCard 
                key={holding.id}
                companyLogoSrc={holding.logoSrc}
                companyName={holding.company_name}
                companyTicker={holding.company_ticker}
                sharesHeld={holding.shares}
                avgPrice={holding.avgPurchasePrice}
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