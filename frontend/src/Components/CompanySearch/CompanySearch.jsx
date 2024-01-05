import React, { useState } from 'react'
import './CompanySearch.css'
import {useForm} from 'react-hook-form'
import { useSelector } from 'react-redux'
import { Button } from '@mui/material'
import { Search } from '@mui/icons-material'
import CompanyDetails from '../CompanyDetails/CompanyDetails'
import { companyInfo } from '../../companyExampleData'
import { getCompanyData } from '../../utilityFunctions/getCompanyData'
import { testData } from '../../testData'

const CompanySearch = () => {

    const [companyData, setCompanyData] = useState(testData);
    const [searchSubmitted, setSearchSubmitted] = useState(false)
    const {register, handleSubmit, formState: {isSubmitSuccessful}} = useForm()

    const userToken = useSelector((state) => state.user.user.token)

    const handleOnSubmit = async (data) => {

        // const response = await getCompanyData(data["company-ticker"], userToken)

        // console.log(response)
        // setCompanyData(response)
        setSearchSubmitted(true)
    }

  return (
    <>
        {searchSubmitted === false
        ?
            <section className='company-search-container'>
                <header>
                    <h2>
                        Enter Company Ticker
                    </h2>
                </header>
                <form id='company-search-form' onSubmit={handleSubmit(handleOnSubmit)}>
                    <input type="text" id='company-ticker' required {...register("company-ticker")} placeholder='Example: MSFT'/>
                    <button type='submit'><Search /></button>
                </form>
            </section>
        :
            <CompanyDetails data={companyData}/>
        }
    </>
  )
}

export default CompanySearch
