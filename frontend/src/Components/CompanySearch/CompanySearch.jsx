import React, { useState } from 'react'
import './CompanySearch.css'
import {useForm} from 'react-hook-form'
import { Button } from '@mui/material'
import { Search } from '@mui/icons-material'
import CompanyDetails from '../CompanyDetails/CompanyDetails'
import { companyInfo } from '../../companyExampleData'

const CompanySearch = () => {

    const [searchSubmitted, setSearchSubmitted] = useState(false)
    const {register, handleSubmit, formState: {isSubmitSuccessful}} = useForm()

    const handleOnSubmit = (data) => {
        console.log(data)
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
            <CompanyDetails info={companyInfo}/>
        }
    </>
  )
}

export default CompanySearch
