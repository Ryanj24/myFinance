import React, {useEffect} from 'react'
import './TransactionForm.css'
import {useForm} from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { addTransaction } from '../../utilityFunctions/addTransaction'
import { editTransaction } from '../../utilityFunctions/editTransaction'

import { addBankTransaction, updateBankTransaction } from '../../redux/bankTransactionSlice'
import { decrementAccountBalance, incrementAccountBalance, updateAccount } from '../../redux/accountSlice'
import { Button } from '@mui/material'


const TransactionForm = ({formType, transaction, toggleModal}) => {

    const {token} = useSelector(state => state.user.user)
    const {register, handleSubmit, formState: {isSubmitSuccessful}} = useForm({defaultValues: {
        transaction_category: formType === "Edit Transaction" ? transaction.category : "",
        transaction_type: formType === "Edit Transaction" ? transaction.type : "",
        transaction_date: formType === "Edit Transaction" ? transaction.transaction_date : "",
        transaction_amount: formType === "Edit Transaction" ? transaction.amount : "",
        transaction_desc: formType === "Edit Transaction" ? transaction.description : "",
    }})
    const dispatch = useDispatch();
    const {id} = useParams();


    const onSubmit = async (data) => {
        if (formType === "Add Transaction") {
            const response = await addTransaction(id, data, token)

            dispatch(addBankTransaction(response))
            if (response.type === "Deposit" || response.type === "Income") {
                dispatch(incrementAccountBalance(response))
            } else {
                dispatch(decrementAccountBalance(response))
            }
        } else {
            const response = await editTransaction(id, transaction, data, token)

            dispatch(updateBankTransaction(response.transaction))
            dispatch(updateAccount(response.account))

        }
    }

    useEffect(() => {
        if (isSubmitSuccessful) {
            toggleModal(false)
        }
    }, [isSubmitSuccessful])

  return (
    <form id='transaction-modal-form' onSubmit={handleSubmit(onSubmit)}>
        <div className="transaction-category">
            <label htmlFor='transaction_category'>Transaction Category</label>
            <select id='transaction_category' {...register("transaction_category")}>
                <option value="">---</option>
                <option value="Housing">Housing</option>
                <option value="Transportation">Transportation</option>
                <option value="Food">Food</option>
                <option value="Utilities">Utilities</option>
                <option value="Medical & Healthcare">Medical & Healthcare</option>
                <option value="Personal">Personal</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Other">Other</option>
            </select>
        </div>

        <div className="transaction-type">
            <label htmlFor='transaction_type'>Transaction Type</label>
            <select id='transaction_type' {...register("transaction_type")}>
                <option value="">---</option>
                <option value="Income">Income</option>
                <option value="Expense">Expense</option>
                <option value="Deposit">Deposit</option>
                <option value="Withdrawl">Withdrawl</option>
            </select>
        </div>

        <div className="transaction-date">
            <label htmlFor='transaction_date'>Date</label>
            <input type="date" id='transaction_date' {...register("transaction_date")}/>
        </div>

        <div className="transaction-amount">
            <label htmlFor='transaction_amount'>Amount</label>
            <input type="number" id='transaction_amount' {...register("transaction_amount")} min={0}/>
        </div>

        <div className="transaction-desc">
            <label htmlFor='transaction_desc'>Description</label>
            <input type="text" id='transaction_desc' {...register("transaction_desc")}/>
        </div>

        <div className="save-btn-container">
            {formType === "Add Transaction"
            ?
                <Button variant='contained' sx={{textTransform: "none", borderRadius: "10px"}} type='submit'>Add Transaction</Button>
            :
                <Button variant='contained' sx={{textTransform: "none", borderRadius: "10px"}} type='submit'>Update Transaction</Button>
            }
            
        </div>
    </form>
  )
}

export default TransactionForm