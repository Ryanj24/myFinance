import React from 'react'
import './PortfolioSort.css'
import { useDispatch } from 'react-redux'
import { sortPortfolios } from '../../redux/portfolioSlice'

const PortfolioSort = () => {

    const dispatch = useDispatch();

    const handleOnChange = (e) => {
        dispatch(sortPortfolios(e.target.value))
    }
  return (
    <section className='portfolios-count-sort'>
        <p>You currently have 0 portfolios</p>
        <div className="portfolios-sort">
            <label htmlFor='portfolios-sort-selector'>Sort by: </label>
            <select id='portfolios-sort-selector' onChange={handleOnChange}>
                <option value="nameAtoZ">Name (A to Z)</option>
                <option value="nameZtoA">Name (Z to A)</option>
                <option value="valueLtoH">Value (low to high)</option>
                <option value="valueHtoL">Value (high to low)</option>
            </select>
        </div>
    </section>
  )
}

export default PortfolioSort