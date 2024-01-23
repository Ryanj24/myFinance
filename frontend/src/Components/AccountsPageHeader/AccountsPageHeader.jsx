import React, { useState } from 'react'
import './AccountsPageHeader.css'
import AccountModal from '../AccountModal/AccountModal';
import { Add } from '@mui/icons-material';

const AccountsPageHeader = () => {

    const [accountModal, setAccountModal] = useState(false);

  return (
    <>
    {accountModal && <AccountModal modalType="Add Account" toggleModal={setAccountModal}/>}
    <header className='accounts-header'>
          <h1>Accounts</h1>
          <div className="accounts-action-btn">
            <button className='create-account-btn' onClick={() => setAccountModal(!accountModal)}>
              <Add /> Create Account
            </button>
          </div>
    </header>
    </>
  )
}

export default AccountsPageHeader