import React from 'react'
import './AccountModal.css'
import { Close } from '@mui/icons-material'
import AccountForm from '../AccountForm/AccountForm'

const AccountModal = ({modalType, toggleModal}) => {
  return (
    <div className='account-modal-container'>
        <div className="account-modal">
            <header className='modal-header'>
                {modalType === "Add Account" ? <h2>Add Account</h2> : <h2>Edit Account</h2>}
                <div className="modal-close-btn-container">
                    <button onClick={() => toggleModal(false)}>
                        <Close />
                    </button>
                </div>
            </header>
            {modalType === "Add Account" ?  <AccountForm formType="Add Account"/> :  <AccountForm formType="Edit Account"/>}
        </div>
    </div>
  )
}

export default AccountModal