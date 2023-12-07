import React from 'react'
import './Accounts.css'
import { useSelector, useDispatch } from 'react-redux'
import AccountCard from '../../Components/AccountCard/AccountCard'
import { accountIcon } from '../../utilityFunctions/accountIcon'
import { sortStrings } from '../../utilityFunctions/sortStrings'
import { sortAccounts } from '../../redux/accountSlice.js'

const Accounts = () => {

  const {accounts} = useSelector(state => state.accounts)
  const dispatch = useDispatch();

  if (!accounts) {
    return (
      <h1>Loading...</h1>
    )
  }

  const handleOnChange = (e) => {
    dispatch(sortAccounts(e.target.value))
  }

  return (
    <section className='accounts-container'>
      <header className='accounts-header'>
        <h1>Accounts</h1>
      </header>

      <section className='accounts-count-sort'>
        <p>You currently have {accounts.length} accounts</p>
        <div className="accounts-sort">
          <label htmlFor='accounts-sort-selector'>Sort by: </label>
          <select id='accounts-sort-selector' onChange={handleOnChange}>
            <option value="nameAtoZ">Name (A to Z)</option>
            <option value="nameZtoA">Name (Z to A)</option>
            <option value="balanceLtoH">Balance (low to high)</option>
            <option value="balanceHtoL">Balance (high to low)</option>
          </select>
        </div>
      </section>

      <section className='accounts-list'>
        {accounts.length > 0
        ?
          accounts.map((account) => accountIcon(account)).map((account) => (
            <AccountCard 
              key={account.id}
              account={account}
            />
          ))
        :
         <p>No accounts currently added</p>
        }
      </section>
    </section>
  )
}

export default Accounts