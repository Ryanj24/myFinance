import React from 'react'
import './Accounts.css'

import AccountsPageHeader from '../../Components/AccountsPageHeader/AccountsPageHeader.jsx'
import AccountsSort from '../../Components/AccountsSort/AccountsSort.jsx'
import AccountsList from '../../Components/AccountsList/AccountsList.jsx'

const Accounts = () => {

  return (
    <>
      <section className='accounts-container'>
        <AccountsPageHeader />
        <AccountsSort />
        <AccountsList />
      </section>
    </>
  )
}

export default Accounts