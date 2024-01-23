import React from 'react'
import './AccountsList.css'
import AccountCard from '../AccountCard/AccountCard'
import { useSelector } from 'react-redux'
import { accountIcon } from '../../utilityFunctions/accountIcon'


const AccountsList = () => {

    const {accounts} = useSelector(state => state.accounts)
  
    return (
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
    )
}

export default AccountsList