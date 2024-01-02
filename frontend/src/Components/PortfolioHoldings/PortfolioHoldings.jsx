import React, { useEffect, useState } from 'react'
import './PortfolioHoldings.css'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setHoldings, sortHoldings } from '../../redux/portfolioSlice.js'
import { calculateHoldings } from '../../utilityFunctions/calculateHoldings'
import PortfolioHoldingsCard from '../PortfolioHoldingsCard/PortfolioHoldingsCard'
import { sortStrings } from '../../utilityFunctions/sortStrings'

const PortfolioHoldings = () => {

  // const [holdings, setHoldings] = useState([]);
  const {id} = useParams()
  const dispatch = useDispatch()
  const {holdings} = useSelector(state => state.portfolios)
  const {transactions} = useSelector(state => state.stockTransactions)

  const handleOnChange = (e) => {
    dispatch(sortHoldings(e.target.value))
  }

  useEffect(() => {
    const holdingsArr = calculateHoldings(id, transactions)
    dispatch(setHoldings(holdingsArr))
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
                companyName={holding.company_name}
                companyTicker={holding.company_ticker}
                sharesHeld={holding.shares}
                avgPrice={holding.avgPurchasePrice}
              />
            ))
          :
            <p>You currently have no share holdings</p>
          }
        </section>
    </>
  )
}

export default PortfolioHoldings