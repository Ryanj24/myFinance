import React from 'react'
import './HoldingCardDropdown.css'
import { AttachMoney, Sell } from '@mui/icons-material'
import { useSelector } from 'react-redux'
import { currentStockPrice } from '../../../utilityFunctions/currentStockPrice.js'

const HoldingCardDropdown = ({companyTicker, company, setCompany, setDropdownActive, setSharesModalActive, setModalType}) => {

    const {token} = useSelector(state => state.user.user)

    const handleOnClick = async (type) => {

        const currentPrice = await currentStockPrice(companyTicker, token)
        setCompany({...company, price: currentPrice.price})
        setModalType(type)
        setSharesModalActive(true)
        setDropdownActive(false)
        // console.log(type)
    }
  return (
    <div className='holding-card-dropdown'>
        <div className="buy-shares-btn-container">
            <button className='shares-buy-btn' onClick={() => handleOnClick("Buy Shares")}>
                <AttachMoney /> Buy Shares
            </button>
            <button className='shares-sell-btn' onClick={() => handleOnClick("Sell Shares")}>
                <Sell /> Sell Shares
            </button>
        </div>        
    </div>
  )
}

export default HoldingCardDropdown