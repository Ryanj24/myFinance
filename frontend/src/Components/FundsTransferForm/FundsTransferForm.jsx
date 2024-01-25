import React, { useState, useEffect } from 'react'
import './FundsTransferForm.css'
import {useForm} from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { incrementAccountBalance, decrementAccountBalance } from '../../redux/accountSlice'
import { addBankTransaction } from '../../redux/bankTransactionSlice'
import { Alert, Button } from '@mui/material'
import { Cancel } from '@mui/icons-material'
import { fundsTransfer } from '../../utilityFunctions/fundsTransfer'

const FundsTransferForm = ({toggleModal}) => {

    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState(false)

    const {register, handleSubmit, formState: {isSubmitSuccessful}} = useForm()

    const {token} = useSelector(state => state.user.user)
    const {accounts} = useSelector(state => state.accounts)
    const {id} = useParams();
    const dispatch = useDispatch()

    const currentAccount = accounts.filter(account => account.id == id)[0]

    const handleOnSubmit = async (data) => {

        if (data.transfer_amount == 0) {
            setError(true)
            setErrorMessage("Cannot transfer £0")
            return
        } else if (data.transfer_amount > +currentAccount.balance) {
            setError(true)
            setErrorMessage(`Cannot transfer more than current balance of ${Intl.NumberFormat("en", {style: "currency", currency: "GBP"}).format(currentAccount.balance)}`)
            return
        }

        const selectedAccount = accounts.filter(acc => acc.account_name === data.account_name)[0]

        const dataObj = {
            senderAccountID: id,
            receiverAccountID: selectedAccount.id,
            amount: data.transfer_amount
        }

        const response = await fundsTransfer(dataObj, token)

        dispatch(decrementAccountBalance(response.senderAccTransaction))
        dispatch(incrementAccountBalance(response.receiverAccTransaction))
        dispatch(addBankTransaction(response.senderAccTransaction))
        dispatch(addBankTransaction(response.receiverAccTransaction))
    }

    useEffect(() => {
        if (isSubmitSuccessful) {
            toggleModal(false)
        }
    }, [isSubmitSuccessful])


  return (
    <>
    {error && 
        <Alert variant='filled' severity='error' icon={<Cancel fontSize='inherit' />} sx={{marginTop: "30px", maxWidth: "350px", display:"flex", alignItems: "center", justifyContent:"center"}}>
            {errorMessage}
        </Alert>
    }
    <form id="transfer-funds-form" onSubmit={handleSubmit(handleOnSubmit)}>
        <div className="available-accounts">
            <label htmlFor='account_name'>Select Account</label>
            <select id='account_name' {...register("account_name")}>
                {accounts.filter(account => account.id != id).map(account => (
                    <option value={account.account_name} key={account.id}>{account.account_name}</option>
                ))}
            </select>
        </div>

        <div className="transfer-amount">
            <label htmlFor='transfer_amount'>Amount</label>
            <input type="number" id='transfer_amount' {...register("transfer_amount")} min={0} step="0.01"/>
        </div>

        <div className="save-btn-container">
            <Button variant='contained' sx={{textTransform: "none", borderRadius: "10px"}} type='submit'>Transfer</Button>
        </div>
    </form>
    </>
  )
}

export default FundsTransferForm