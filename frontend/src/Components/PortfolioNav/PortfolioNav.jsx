import React from 'react'
import './PortfolioNav.css'
import { Link } from 'react-router-dom'

const PortfolioNav = ({selectedTab, setSelectedTab}) => {

    const handleOnClick = (e) => {
        setSelectedTab(`${e.target.innerHTML}`)
    }
  return (
    <section className='portfolio-nav-bar'>
        <ul className='portfolio-nav-links'>
            <li className='portfolio-nav-link'>
                <Link>
                    <button className={selectedTab === "My Portfolios" ? 'selected' : null} onClick={handleOnClick}>
                        My Portfolios
                    </button>
                </Link>
            </li>
            <li className='portfolio-nav-link'>
                <Link>
                    <button className={selectedTab === "Company Search" ? 'selected' : null} onClick={handleOnClick}>
                        Company Search
                    </button>
                </Link>
            </li>
        </ul>
    </section>
  )
}

export default PortfolioNav