import React, { useState } from 'react'
import './SharesForm.css'
import {useForm} from 'react-hook-form'
import { Alert, Button } from '@mui/material'
import { Cancel } from '@mui/icons-material'
import { useSelector, useDispatch } from 'react-redux'
import { addStockTransaction } from '../../redux/stockTransactionSlice'
import { addHolding, increaseHoldingShares, decreaseHoldingShares, incrementPortfolioBalance, decrementPortfolioBalance, deleteHolding } from '../../redux/portfolioSlice'
import { validateSharesForm } from '../../utilityFunctions/validateSharesForm'
import { sharesTransaction } from '../../utilityFunctions/sharesTransaction'
import { calculateShareHolding } from '../../utilityFunctions/calculateShareHolding'
import { useParams } from 'react-router-dom'

const SharesForm = ({formType, toggleModal, company, activationPoint}) => {

    const {id} = useParams()
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("")
    const [holdingsID, setHoldingsID] = useState(1);

    const {token} = useSelector(state => state.user.user)
    const dispatch = useDispatch()

    const {register, handleSubmit, watch} = useForm({defaultValues: {
        company_name: company.companyName,
        shares_amount: 0
    }});

    // Get all portfolios and stock transactions
    const {portfolios} = useSelector(state => state.portfolios)
    const {transactions} = useSelector(state => state.stockTransactions)


    // Get portfolio IDs from each transaction of shares for the selected company 
    const transactionPortfolioIDs = transactions.filter(transaction => transaction.company_name === company.name).map(transaction => transaction.portfolio_id)
    const availablePortfolios = portfolios.filter(portfolio => transactionPortfolioIDs.includes(portfolio.id))

    const handleOnSubmit = async (data) => {

        // // Get the selected portfolio and the shares currently held of the company in that portfolio
        const selectedPortfolio = portfolios.filter(portfolio => portfolio.portfolio_name === data.portfolio_name)[0]
        const currentSharesHeld = calculateShareHolding(transactions, company.companyName, selectedPortfolio.id)

        const dataObj = {
            ...data,
            logoSrc: activationPoint === "Holding Dropdown" ? "" : company.image,
            tickerSymbol: activationPoint === "Holding Dropdown" ? company.companyTicker : company.symbol,
            pricePerShare: company.price,
            currentSharesHeld
        }
        
        // // Validate the form inputs
        const validateInputs = validateSharesForm(formType, dataObj, selectedPortfolio)

        if (validateInputs.valid) {
            const response = await sharesTransaction(formType, dataObj, selectedPortfolio.id, token)

            dispatch(addStockTransaction(response.transaction))

            if (formType === "Buy Shares") {
                dispatch(decrementPortfolioBalance(response.transaction))

                if (currentSharesHeld == 0) {

                    dispatch(addHolding(response.holding))

                    setHoldingsID(holdingsID + 1)

                } else {

                    dispatch(increaseHoldingShares(response))
                }
            } else {
                dispatch(incrementPortfolioBalance(response.transaction))

                if (!response.holding) {
                    dispatch(deleteHolding(response))
                } else {
                    dispatch(decreaseHoldingShares(response))
                }
            }
            toggleModal(false)
        } else {
            setError(true)
            setErrorMessage(validateInputs.reason)
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
                    (activationPoint === "Holding Dropdown")
                    ?
                        <select id='portfolio_name' {...register("portfolio_name")}>
                            {portfolios.filter(portfolio => portfolio.id == id).map(portfolio => (
                                <option value={portfolio.portfolio_name} key={portfolio.id}>{portfolio.portfolio_name}</option>
                            ))}
                        </select>
                    :
                        <select id='portfolio_name' {...register("portfolio_name")}>
                            {portfolios.map(portfolio => (
                                <option value={portfolio.portfolio_name} key={portfolio.id}>{portfolio.portfolio_name}</option>
                            ))}
                        </select>
                :
                    (activationPoint === "Holding Dropdown")
                    ?
                        <select id='portfolio_name' {...register("portfolio_name")}>
                            {portfolios.filter(portfolio => portfolio.id == id).map(portfolio => (
                                <option value={portfolio.portfolio_name} key={portfolio.id}>{portfolio.portfolio_name}</option>
                            ))}
                        </select>
                    :

                        <select id='portfolio_name' {...register("portfolio_name")}>
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
                        <p>{Intl.NumberFormat("en-US", {style: "currency", currency: "USD"}).format(watch("shares_amount") * company.price)}</p>
                    </>
                :
                    <>
                        <h3>Sale Total</h3>
                        <p>{Intl.NumberFormat("en-US", {style: "currency", currency: "USD"}).format(watch("shares_amount") * company.price)}</p>
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