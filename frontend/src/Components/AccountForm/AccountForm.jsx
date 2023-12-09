import React from 'react'
import './AccountForm.css'
import { useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from '@mui/material'

const AccountForm = ({formType}) => {

    const {register, handleSubmit} = useForm()
    const dispatch = useDispatch();


    const onSubmit = async (data) => {
        console.log(data)
    }
  return (
    <form id='account-modal-form' onSubmit={handleSubmit(onSubmit)}>
        <div className="account-name">
            <label htmlFor='account_name'>Account Name</label>
            <input type="text" id='account' {...register("account_name")}/>
        </div>  

        <div className="account-number">
            <label htmlFor='account_number'>Account Number</label>
            <input type="text" id='account_number' {...register("account_number")}/>
        </div>

        <div className="account-balance">
            <label htmlFor='account_balance'>Account Balance</label>
            <input type="number" id='account_balance' {...register("account_balance")} min={0}/>
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