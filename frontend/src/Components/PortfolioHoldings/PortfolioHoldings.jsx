import React from 'react'
import './PortfolioHoldings.css'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { calculateHoldings } from '../../utilityFunctions/calculateHoldings'
import PortfolioHoldingsCard from '../PortfolioHoldingsCard/PortfolioHoldingsCard'

const PortfolioHoldings = () => {

    const {id} = useParams()
    const {transactions} = useSelector(state => state.stockTransactions)

    const holdings = calculateHoldings(id, transactions)

    console.log(holdings)
  return (
    <>
        <div className="holdings-sort">
            <label htmlFor='holdings-sort-selector'>Sort by: </label>
            <select id='holdings-sort-selector'>
                <option value="nameAtoZ">Name (A to Z)</option>
                <option value="nameZtoA">Name (Z to A)</option>
                <option value="newToOld">Date (Newest - Oldest)</option>
                <option value="oldToNew">Date (Oldest - Newest)</option>
                <option value="amountLtoH">Amount (Lowest - Highest)</option>
                <option value="amountHtoL">Amount (Highest - Lowest)</option>
            </select>
        </div>
        <section className='portfolio-holdings'>
          {holdings.map(holding => (
            <PortfolioHoldingsCard 
              key={holding.id}
              holding={holding}
            />
          ))}
        </section>
    </>
  )
}

export default PortfolioHoldings