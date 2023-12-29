import React, { useState } from 'react'
import './SharesForm.css'
import {useForm} from 'react-hook-form'
import { Alert, Button } from '@mui/material'
import { Cancel } from '@mui/icons-material'
import { useSelector } from 'react-redux'
import { validateSharesForm } from '../../utilityFunctions/validateSharesForm'

const SharesForm = ({formType, toggleModal, company}) => {

    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("")

    const {register, handleSubmit, formState: {isSubmitSuccessful}, watch} = useForm({defaultValues: {
        company_name: company.name,
        shares_amount: 0
    }});

    // Get all portfolios and stock transactions
    const {portfolios} = useSelector(state => state.portfolios)
    const {transactions} = useSelector(state => state.stockTransactions)


    // Get portfolio IDs from each transaction of shares for the selected company 
    const transactionPortfolioIDs = transactions.filter(transaction => transaction.company_name === company.name).map(transaction => transaction.portfolio_id)
    const availablePortfolios = portfolios.filter(portfolio => transactionPortfolioIDs.includes(portfolio.id))

    const handleOnSubmit = async (data) => {

        const selectedPortfolio = portfolios.filter(portfolio => portfolio.portfolio_name === data.portfolio_name)[0]
        const currentSharesHeld = transactions.filter(transaction => transaction.company_name === company.name).reduce((acc, currVal) => acc + currVal.quantity, 0)

        const validateInputs = validateSharesForm(formType, {...data, transactionTotal: company.pricePerShare * data.shares_amount, currentSharesHeld}, selectedPortfolio)

        if (!validateInputs.valid) {
            setError(true)
            setErrorMessage(validateInputs.reason)
        } else {
            toggleModal(false)
        }
    }

  return (
    <>
        {error && 
            <Alert variant='filled' severity='error' icon={<Cancel fontSize='inherit' />} sx={{marginTop: "30px"}}>
                {errorMessage}
            </Alert>
        }
        <form id="shares-modal-form" onSubmit={handleSubmit(handleOnSubmit)}>
            <div className="company-name">
                <label htmlFor='company_name'>Company Name</label>
                <input type="text" id='company_name' {...register("company_name")}/>
            </div>  

            <div className="share-amount">
                <label htmlFor='shares_amount'>Number of Shares</label>
                <input type="number" id='shares_amount' {...register("shares_amount")} min={0}/>
            </div>

            <div className="available-portfolios">
                <label htmlFor='portfolio_name'>Available Portfolios</label>
                {formType === "Buy Shares"
                ?
                    <select id='portfolio_name' {...register("portfolio_name")}>
                        <option value="">---</option>
                        {portfolios.map(portfolio => (
                            <option value={portfolio.portfolio_name} key={portfolio.id}>{portfolio.portfolio_name}</option>
                        ))}
                    </select>
                :
                    <select id='portfolio_name' {...register("portfolio_name")}>
                        <option value="">---</option>
                        {availablePortfolios.map(portfolio => (
                            <option value={portfolio.portfolio_name} key={portfolio.id}>{portfolio.portfolio_name}</option>
                        ))}
                    </select>
                }
            </div>

            <div className="transaction-total">
                {formType === "Buy Shares"
                ?
                    <>
                        <h3>Purchase Total</h3>
                        <p>{Intl.NumberFormat("en-US", {style: "currency", currency: "USD"}).format(watch("shares_amount") *company.pricePerShare)}</p>
                    </>
                :
                    <>
                        <h3>Sale Total</h3>
                        <p>{Intl.NumberFormat("en-US", {style: "currency", currency: "USD"}).format(watch("shares_amount") *company.pricePerShare)}</p>
                    </>
                }
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
    </>
  )
}

export default SharesForm