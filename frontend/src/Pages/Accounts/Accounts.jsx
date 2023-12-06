import React from 'react'
import './Accounts.css'
import { useSelector } from 'react-redux'
import AccountCard from '../../Components/AccountCard/AccountCard'
import { accountIcon } from '../../utilityFunctions/accountIcon'

const Accounts = () => {

  const accountsArray = useSelector(state => state.accounts.accounts)

  if (!accountsArray) {
    return (
      <h1>Loading...</h1>
    )
  }

  const accountsWithIcon = accountsArray.map((account) => accountIcon(account))

  return (
    <section className='accounts-container'>
      <header className='accounts-header'>
        <h1>Accounts</h1>
      </header>

      <section className='accounts-count-sort'>
        <p>You currently have {accountsWithIcon.length} accounts</p>
        <div className="accounts-sort">
          <label htmlFor='accounts-sort-selector'>sort by: </label>
          <select id='accounts-sort-selector'>
            <option value="nameAtoZ">Name (A to Z)</option>
            <option value="nameZtoA">Name (Z to A)</option>
            <option value="balanceLtoH">Balance (low to high)</option>
            <option value="balanceHtoL">Balance (high to low)</option>
          </select>
        </div>
      </section>

      <section className='accounts-list'>
        {accountsWithIcon.map((account) => (
          <AccountCard 
            key={account.id}
            provider={account.iconIndex}
            name={account.account_name}
            number={account.account_number}
            balance={account.balance}
          />
        ))}
      </section>
    </section>
  )
}

export default Accounts