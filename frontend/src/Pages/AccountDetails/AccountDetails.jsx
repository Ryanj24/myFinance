import React from 'react'
import './AccountDetails.css'
import AccountOverview from '../../Components/AccountOverview/AccountOverview.jsx'
import AccountTransactions from '../../Components/AccountTransactions/AccountTransactions.jsx'

import { Delete, Edit } from '@mui/icons-material'

const AccountDetails = () => {

  return (
    <section className='account-details-container'>
      <header className='account-header'>
        <h1>
          Account Overview
        </h1>
        <div className="account-action-btns">
          <button className='account-edit-btn'>
            <Edit /> Edit Account
          </button>
          <button className='account-delete-btn'>
            <Delete /> Delete Account
          </button>
        </div>
      </header>
      <AccountOverview />
      <AccountTransactions />
    </section>
  )
}

export default AccountDetails