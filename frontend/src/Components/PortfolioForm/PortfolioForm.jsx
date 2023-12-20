import React, {useEffect} from 'react'
import './PortfolioForm.css'
import {useForm} from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Button } from '@mui/material'

const PortfolioForm = ({formType, toggleModal}) => {

    const {token} = useSelector(state => state.user.user)
    const {register, handleSubmit, formState: {isSubmitSuccessful}} = useForm({defaultValues: {
        portfolio_name: formType === "Edit Portfolio" ? portfolio.portfolio_name : "",
        portfolio_balance: formType === "Edit Portfolio" ? portfolio.balance : "",
        portfolio_provider: formType === "Edit Portfolio" ? portfolio.provider : ""
    }})
    const dispatch = useDispatch();
    const {id} = useParams();


    const onSubmit = async (data) => {
        // if (formType === "Add Portfolio") {
        //     const response = await createAccount(data, token)

        //     dispatch(addAccount(response))
        // } else {
        //     const response = await editAccount(id, data, token)

        //     dispatch(updateAccount(response))
        // }
        console.log(data)
    }

    useEffect(() => {
        if (isSubmitSuccessful) {
            toggleModal(false)
        }
    }, [isSubmitSuccessful])

  return (
    <form id='portfolio-modal-form' onSubmit={handleSubmit(onSubmit)}>
        <div className="portfolio-name">
            <label htmlFor='portfolio_name'>Portfolio Name</label>
            <input type="text" id='portfolio_name' {...register("portfolio_name")}/>
        </div>  

        <div className="portfolio-balance">
            {formType === "Add Portfolio" ? <label htmlFor='portfolio_balance'>Initial Balance</label> : <label htmlFor='portfolio_balance'>Portfolio Balance</label>}
            <input type="number" id='portfolio_balance' {...register("portfolio_balance")} min={0}/>
        </div>

        <div className="portfolio-provider">
            <label htmlFor='portfolio_provider'>Portfolio Provider</label>
            <select id='portfolio_provider' {...register("portfolio_provider")}>
                <option value="AJ Bell">AJ Bell</option>
                <option value="Barclays">Barclays</option>
                <option value="Fidelity">Fidelity</option>
                <option value="Freetrade">Freetrade</option>
                <option value="Hargreaves Lansdown">Hargreaves Lansdown</option>
                <option value="HSBC">HSBC</option>
                <option value="Lloyds">Lloyds Bank</option>
                <option value="JP Morgan">JP Morgan</option>
                <option value="Morgan Stanley">Morgan Stanley</option>
                <option value="NatWest">NatWest</option>
                <option value="Royal Bank of Scotland">Royal Bank of Scotland</option>
                <option value="Santander">Santander</option>
                <option value="Trading212">Trading212</option>
                <option value="Vanguard">Vanguard</option>
                <option value="Other">Other</option>
            </select>
        </div>
        <div className="save-btn-container">
            {formType === "Add Portfolio"
            ?
                <Button variant='contained' sx={{textTransform: "none", borderRadius: "10px"}} type='submit'>Create Portfolio</Button>
            :
                <Button variant='contained' sx={{textTransform: "none", borderRadius: "10px"}} type='submit'>Update Portfolio</Button>
            }
            
        </div>
    </form>
  )
}

export default PortfolioForm