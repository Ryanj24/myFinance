import React from 'react'
import './AccountOverview.css'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Typography } from '@mui/material';
import { AccountBalance } from '@mui/icons-material';

import Barclays from '../../assets/bank-logos-full/Barclays_full.svg'
import HSBC from '../../assets/bank-logos-full/HSBC_full.svg'
import Lloyds from '../../assets/bank-logos-full/Lloyds_Bank_full.svg'
import Monzo from '../../assets/bank-logos-full/Monzo_full.svg'
import NatWest from '../../assets/bank-logos-full/NatWest.svg'
import RBS from '../../assets/bank-logos-full/RBS_full.svg'
import Santander from '../../assets/bank-logos-full/Santander_full.svg'
import Starling from '../../assets/bank-logos-full/Starling_Bank_full.svg'
import VirginMoney from '../../assets/bank-logos-full/Virgin_Money_full.svg'
import { accountIcon } from '../../utilityFunctions/accountIcon.js'
import { bankIcons } from '../DashboardCards/Accounts.jsx'

const fullBankLogos = [Barclays, HSBC, Lloyds, Monzo, NatWest, RBS, Santander, Starling, VirginMoney, <AccountBalance />]


const AccountOverview = () => {

  const {id} = useParams();

  const account = useSelector(state => state.accounts.accounts).filter(acc => acc.id == id).map(acc => accountIcon(acc))[0];

  if (!account) {
    return (
      <h1>Loading...</h1>
    )
  }

  return (
    <section className='details-section'>
        <div className="provider-logo-container">
          {account.iconIndex === 9
              ?
                <>{bankIcons[account.iconIndex]}</>
              :
                <img src={fullBankLogos[account.iconIndex]} alt={account.account_provider + " Logo"} height="100%" width="100%"/>
          }
        </div>
        <div className="account-info">
          <div className="account-name">
            <Typography variant='h5' component="h5" gutterBottom>
              Account Name
            </Typography>
            <Typography variant='body1' component="p">
              {account.account_name}
            </Typography>
          </div>
          <div className="account-number">
            <Typography variant='h5' component="h5" gutterBottom>
              Account Number
            </Typography>
            <Typography variant='body1' component="p">
              {account.account_number}
            </Typography>
          </div>
          <div className="account-balance">
            <Typography variant='h5' component="h5" gutterBottom>
              Account Balance
            </Typography>
            <Typography variant='body1' component="p">
              {Intl.NumberFormat("en-US", {style: "currency", currency: "GBP"}).format(account.balance)}
            </Typography>
          </div>
        </div>
    </section>
  )
}

export default AccountOverview