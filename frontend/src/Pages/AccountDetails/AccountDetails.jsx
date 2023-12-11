import React, { useState } from 'react'
import './AccountDetails.css'
import AccountOverview from '../../Components/AccountOverview/AccountOverview.jsx'
import AccountTransactions from '../../Components/AccountTransactions/AccountTransactions.jsx'
import AccountModal from '../../Components/AccountModal/AccountModal.jsx'
import { removeAccount } from '../../utilityFunctions/removeAccount.js'
import { deleteAccount } from '../../redux/accountSlice.js'

import { Delete, Edit } from '@mui/icons-material'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

const AccountDetails = () => {

  const [editModal, setEditModal] = useState(false);
  const {token} = useSelector(state => state.user.user)
  const {id} = useParams();
  const nav = useNavigate();
  const dispatch = useDispatch();

  const handleDelete = async () => {
    const response = await removeAccount(id, token);

    dispatch(deleteAccount(response))
    nav("/home/accounts")
  }

  return (
    <>
      {editModal && <AccountModal modalType="Edit Account" toggleModal={setEditModal}/>}
      <section className='account-details-container'>
        <header className='account-header'>
          <h1>
            Account Overview
          </h1>
          <div className="account-action-btns">
            <button className='account-edit-btn' onClick={() => setEditModal(!editModal)}>
              <Edit /> Edit Account
            </button>
            <button className='account-delete-btn' onClick={handleDelete}>
              <Delete /> Delete Account
            </button>
          </div>
        </header>
        <AccountOverview />
        <AccountTransactions />
      </section>
    </>
  )
}

export default AccountDetails