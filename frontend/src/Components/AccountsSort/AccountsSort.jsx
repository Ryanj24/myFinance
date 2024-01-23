import React from 'react'
import './AccountsSort.css'
import { useSelector, useDispatch } from 'react-redux'
import { sortAccounts } from '../../redux/accountSlice.js'

const AccountsSort = () => {

    const {accounts} = useSelector(state => state.accounts)
    const dispatch = useDispatch();

    const handleOnChange = (e) => {
        dispatch(sortAccounts(e.target.value))
    }
  return (
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
  )
}

export default AccountsSort