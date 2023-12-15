import React from 'react'
import './AccountModal.css'
import { Close } from '@mui/icons-material'
import AccountForm from '../AccountForm/AccountForm'
import TransactionForm from '../TransactionForm/TransactionForm'

const AccountModal = ({modalType, toggleModal, account, transaction}) => {
  return (
    <div className='account-modal-container'>
        <div className="account-modal">
            <header className='modal-header'>
              {modalType === "Add Account"
              ? <h2>Add Account</h2>
              : (modalType === "Edit Account") ? <h2>Edit Account</h2>
              : (modalType === "Add Transaction") ? <h2>Add Transaction</h2>
              : <h2>Edit Transaction</h2>  
              }
              <div className="modal-close-btn-container">
                  <button onClick={() => toggleModal(false)}>
                      <Close />
                  </button>
              </div>
            </header>
            {modalType === "Add Account"
            ?
              <AccountForm 
                formType="Add Account" 
                toggleModal={toggleModal}
              />
            : (modalType === "Edit Account")
            ?
              <AccountForm 
                formType="Edit Account" 
                account={account}
                toggleModal={toggleModal}
              />
            : (modalType === "Add Transaction")
            ?
              <TransactionForm 
                formType="Add Transaction"
                toggleModal={toggleModal}
              />
            :
              <TransactionForm 
                formType="Edit Transaction"
                toggleModal={toggleModal}
                transaction={transaction}
              />
            }
        </div>
    </div>
  )
}

export default AccountModal