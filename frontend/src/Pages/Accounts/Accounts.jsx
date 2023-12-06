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

  let accountsWithIcon = accountsArray.map((account) => accountIcon(account)).sort((a, b) => a.balance > b.balance)
  console.log(accountsWithIcon)

  const handleOnChange = (e) => {
    switch(e.target.value) {
      case "nameAtoZ":
        accountsWithIcon.sort((a, b) => a.balance - b.balance)
        break;
      case "nameZtoA":
        accountsWithIcon.sort((a, b) => a.balance < b.balance)
        break;
      case "balanceLtoH":
        accountsWithIcon.sort((a, b) => a.account_name < b.account_name)
        break;
      case "balanceHtoL":
        accountsWithIcon.sort((a, b) => a.account_name < b.account_name)
        break;
      default:
        break;
    }
    console.log(accountsWithIcon)
  }

  return (
    <section className='accounts-container'>
      <header className='accounts-header'>
        <h1>Accounts</h1>
      </header>

      <section className='accounts-count-sort'>
        <p>You currently have {accountsWithIcon.length} accounts</p>
        <div className="accounts-sort">
          <label htmlFor='accounts-sort-selector'>sort by: </label>
          <select id='accounts-sort-selector' onChange={handleOnChange}>
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