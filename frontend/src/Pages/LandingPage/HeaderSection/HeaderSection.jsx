import React from 'react'
import './HeaderSection.css'
import headerIllustration from '../../../assets/Lady-and-Wallet-illustration.svg'
import { Typography } from '@mui/material'

const HeaderSection = () => {
  return (
    <section className='header-section'>
        <div className="image-container">
            <img src={headerIllustration} alt="Illustration showing a woman with a wallet, money and a credit card" height={600} width={600}/>
        </div>
        <div className="header-text">
            <Typography variant='h2'>Your All-in-One Personal Finance Platform</Typography>
            <p className='sub-header-text'>
                Take full control of your finances with a unqiue overview of accounts, savings goals and portfolios and gain insights into your spending habits.
            </p>
        </div>
    </section>
  )
}

export default HeaderSection