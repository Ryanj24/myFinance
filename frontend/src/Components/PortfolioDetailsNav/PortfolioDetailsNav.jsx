import React, { useState } from 'react'
import './PortfolioDetailsNav.css'
import { Link } from 'react-router-dom'
import PortfolioHoldings from '../PortfolioHoldings/PortfolioHoldings'

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
                <Link>
                    <button className={selectedTab === "Holdings" ? 'selected' : null} onClick={handleOnClick}>
                        Holdings
                    </button>
                </Link>
            </li>
            <li className='portfolio-details-nav-link'>
                <Link>
                    <button className={selectedTab === "Transaction History" ? 'selected' : null} onClick={handleOnClick}>
                        Transaction History
                    </button>
                </Link>
            </li>
        </ul>
    </section>
    {selectedTab === "Holdings" && <PortfolioHoldings />}
    </>
  )
}

export default PortfolioDetailsNav