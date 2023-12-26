import React from 'react'
import './SharesForm.css'
import {useForm} from 'react-hook-form'
import { Button } from '@mui/material'

const SharesForm = ({formType}) => {

    const {register, handleSubmit, formState: {isSubmitSuccessful}} = useForm();

  return (
    <form id="shares-modal-form">
        <div className="company-name">
            <label htmlFor='company_name'>Company Name</label>
            <input type="text" id='company_name' {...register("company_name")}/>
        </div>  

        <div className="share-amount">
            <label htmlFor='shares_amount'>Number of Shares</label>
            <input type="number" id='shares_amount' {...register("shares_amount")} min={0}/>
        </div>

        <div className="save-btn-container">
            {formType === "Buy Shares"
            ?
                <Button variant='contained' sx={{textTransform: "none", borderRadius: "10px"}} type='submit'>Buy</Button>
            :
                <Button variant='contained' sx={{textTransform: "none", borderRadius: "10px"}} type='submit'>Sell</Button>
            }
            
        </div>
    </form>
  )
}

export default SharesForm