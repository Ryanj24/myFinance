import React, { useState } from 'react'
import './PortfolioDetailsNav.css'
import PortfolioHoldings from '../PortfolioHoldings/PortfolioHoldings'
import PortfolioTransactions from '../PortfolioTransactions/PortfolioTransactions'

const PortfolioDetailsNav = () => {

    const [selectedTab, setSelectedTab] = useState("Holdings")

    const handleOnClick = (e) => {
        setSelectedTab(`${e.target.innerHTML}`)
    }

  return (
    <>
    <section className='portfolio-details-nav-bar'>
        <ul className='portfolio-details-nav-links'>
            <li className='portfolio-details-nav-link'>
                <button className={selectedTab === "Holdings" ? 'selected' : null} onClick={handleOnClick}>
                    Holdings
                </button>

            </li>
            <li className='portfolio-details-nav-link'>
                <button className={selectedTab === "Transaction History" ? 'selected' : null} onClick={handleOnClick}>
                    Transaction History
                </button>
            </li>
        </ul>
    </section>
    {selectedTab === "Holdings"
    ? 
        <PortfolioHoldings />
    :
        <PortfolioTransactions />
    }
    </>
  )
}

export default PortfolioDetailsNav