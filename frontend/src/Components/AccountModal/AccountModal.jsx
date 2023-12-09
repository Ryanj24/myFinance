import React from 'react'
import './AccountModal.css'
import { Close } from '@mui/icons-material'
import AccountForm from '../AccountForm/AccountForm'

const AccountModal = ({setAccountModal}) => {
  return (
    <div className='account-modal-container'>
        <div className="account-modal">
            <header className='modal-header'>
                <h2>Add Account</h2>
                <div className="modal-close-btn-container">
                    <button onClick={() => setAccountModal(false)}>
                        <Close />
                    </button>
                </div>
            </header>
            <AccountForm />
        </div>
    </div>
  )
}

export default AccountModal