import React, { useState } from 'react'
import './CompanySearch.css'
import {useForm} from 'react-hook-form'
import { useSelector } from 'react-redux'
import { Alert, Button, Typography } from '@mui/material'
import { Search, Cancel } from '@mui/icons-material'
import CompanyDetails from '../CompanyDetails/CompanyDetails'
import { companyInfo } from '../../companyExampleData'
import { getCompanyData } from '../../utilityFunctions/getCompanyData'
import { testData } from '../../testData'
import { Link } from 'react-router-dom'

const CompanySearch = () => {

    const [companyData, setCompanyData] = useState(testData);
    const [searchSubmitted, setSearchSubmitted] = useState(false)
    const {register, handleSubmit, formState: {isSubmitSuccessful}} = useForm()
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    const userToken = useSelector((state) => state.user.user.token)

    const handleOnSubmit = async (data) => {

        if (!data["company-ticker"]) {
            setError(true)
            setErrorMessage("Please enter a valid company ticker")
            return
        }

        const response = await getCompanyData(data["company-ticker"].toLowerCase().trim().replaceAll(" ", ""), userToken)

        if (!("overviewData" in response)) {
            setError(true)
            setErrorMessage("Company not found")
            return
        }
        
        console.log(response)

        setCompanyData(response)
        setSearchSubmitted(true)
    }

  return (
    <>
        {searchSubmitted === false
        ?
            <>
            <section className='company-search-container'>
                {error && 
                    <Alert variant='filled' severity='error' icon={<Cancel fontSize='inherit' />} sx={{marginTop: "20px", marginBottom: "20px"}}>
                        {errorMessage}
                    </Alert>
                }
                <header>
                    <h2>
                        Enter Company Ticker
                    </h2>
                </header>
                <form id='company-search-form' onSubmit={handleSubmit(handleOnSubmit)}>
                    <input type="text" id='company-ticker'  {...register("company-ticker")} placeholder='Example: MSFT'/>
                    <button type='submit'><Search /></button>
                </form>
            </section>
            <div className="data-attribution">
                <Typography variant='body1' component="p">Data provided by <Link to="https://financialmodelingprep.com/developer/docs">Financial Modeling Prep</Link></Typography>
            </div>
            </>
        :
            <CompanyDetails data={companyData}/>
        }
    </>
  )
}

export default CompanySearch
