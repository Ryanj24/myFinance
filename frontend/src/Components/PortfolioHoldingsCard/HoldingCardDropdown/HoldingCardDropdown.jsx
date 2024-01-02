import React from 'react'
import './HoldingCardDropdown.css'
import { AttachMoney, Sell } from '@mui/icons-material'

const HoldingCardDropdown = ({setDropdownActive, setSharesModalActive, setModalType}) => {

    const handleOnClick = (type) => {
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