import React from 'react'
import './AccountForm.css'
import { useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from '@mui/material'
import { createAccount } from '../../utilityFunctions/createAccount'
import { addAccount, updateAccount } from '../../redux/accountSlice.js'
import { editAccount } from '../../utilityFunctions/editAccount.js'
import { useParams } from 'react-router-dom'

const AccountForm = ({formType, account}) => {

    const {user, token} = useSelector(state => state.user.user)
    const {register, handleSubmit} = useForm({defaultValues: {
        account_name: formType === "Edit Account" ? account.account_name : "",
        account_number: formType === "Edit Account" ? account.account_number : "",
        account_balance: formType === "Edit Account" ? account.balance : "",
        account_provider: formType === "Edit Account" ? account.account_provider : ""
    }})
    const dispatch = useDispatch();
    const {id} = useParams();


    const onSubmit = async (data) => {
        if (formType === "Add Account") {
            const response = await createAccount(data, token)

            dispatch(addAccount(response))
        } else {
            const response = await editAccount(id, data, token)

            dispatch(updateAccount(response))
        }
    }
  return (
    <form id='account-modal-form' onSubmit={handleSubmit(onSubmit)}>
        <div className="account-name">
            <label htmlFor='account_name'>Account Name</label>
            <input type="text" id='account_name' {...register("account_name")}/>
        </div>  

        <div className="account-number">
            <label htmlFor='account_number'>Account Number</label>
            <input type="text" id='account_number' {...register("account_number")}/>
        </div>

        <div className="account-balance">
            {formType === "Add Account" ? <label htmlFor='account_balance'>Initial Balance</label> : <label htmlFor='account_balance'>Account Balance</label>}
            <input type="number" id='account_balance' {...register("account_balance")} min={0}/>
        </div>

        <div className="account-provider">
            <label htmlFor='account_provider'>Account Provider</label>
            <select id='account_provider' {...register("account_provider")}>
                <option value="Barclays">Barclays</option>
                <option value="HSBC">HSBC</option>
                <option value="Lloyds">Lloyds Bank</option>
                <option value="Monzo">Monzo</option>
                <option value="NatWest">NatWest</option>
                <option value="Royal Bank of Scotland">Royal Bank of Scotland</option>
                <option value="Santander">Santander</option>
                <option value="Starling Bank">Starling Bank</option>
                <option value="Virgin Money">Virgin Money</option>
                <option value="Other">Other</option>
            </select>
        </div>
        <div className="save-btn-container">
            {formType === "Add Account"
            ?
                <Button variant='contained' sx={{textTransform: "none", borderRadius: "10px"}} type='submit'>Create Account</Button>
            :
                <Button variant='contained' sx={{textTransform: "none", borderRadius: "10px"}} type='submit'>Update Account</Button>
            }
            
        </div>
    </form>
  )
}

export default AccountForm