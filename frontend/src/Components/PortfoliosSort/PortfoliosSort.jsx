import React from 'react'
import './PortfoliosSort.css'
import { useDispatch, useSelector } from 'react-redux'
import { sortPortfolios } from '../../redux/portfolioSlice'

const PortfoliosSort = () => {

    const {portfolios} = useSelector(state => state.portfolios)
    const dispatch = useDispatch();

    const handleOnChange = (e) => {
        dispatch(sortPortfolios(e.target.value))
    }

    // console.log("Portfolio Sort re-render")
  return (
    <section className='portfolios-count-sort'>
        <p>You currently have {portfolios.length} portfolios</p>
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

export default PortfoliosSort