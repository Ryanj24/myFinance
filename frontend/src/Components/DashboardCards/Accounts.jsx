import React from 'react'
import { useSelector } from 'react-redux'
import SpendingCard from '../SpendingCard/SpendingCard.jsx'

import Barclays from '../../assets/bank-logo-icons/Barclays_icon.svg'
import HSBC from '../../assets/bank-logo-icons/HSBC_icon.svg'
import Lloyds from '../../assets/bank-logo-icons/LloydsBank_icon.svg'
import Monzo from '../../assets/bank-logo-icons/Monzo_icon.svg'
import NatWest from '../../assets/bank-logos-full/NatWest.svg'
import RBS from '../../assets/bank-logo-icons/RBS_icon.svg'
import Santander from '../../assets/bank-logo-icons/Santander_icon.svg'
import Starling from '../../assets/bank-logo-icons/StarlingBank_icon.svg'
import VirginMoney from '../../assets/bank-logo-icons/VirginMoney_icon.svg'

import { Icon } from '@mui/material'

const Accounts = () => {

    const accounts = useSelector(state => state.accounts.accounts)
  return (
    <div className="accounts">
        <header className='accounts-header'>
          <h3>Accounts Overview</h3>
        </header>
        <ul className='accounts-list'>
            <SpendingCard icon={<Icon><img src={VirginMoney} alt='Logo' height="100%" width="100%"/></Icon>} name={"Test Account"} amount={5000}/>
        </ul>

    </div>
  )
}

export default Accounts