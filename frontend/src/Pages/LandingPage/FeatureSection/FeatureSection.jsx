import React from 'react'
import './FeatureSection.css'

import financialData from '../../../assets/illustrations/Financial-Data-illustration.svg'
import manageMoney from '../../../assets/illustrations/Manage-Money-illustration.svg'
import savingsGoals from '../../../assets/illustrations/Savings-Goals-illustration.svg'

import { Box, Container, Typography } from '@mui/material'
import LandingPageCard from '../../../Components/LandingPageCard/LandingPageCard.jsx'

const FeatureSection = () => {
  return (
    <Container className='feature-section' maxWidth="xl">
        <Box component="header" className='feature-section-header'>
            <Typography variant='h2'>
                Features
            </Typography>
        </Box>
        <Box component="section" className='feature-cards'>
            <LandingPageCard 
                imageSource={financialData}
                imageAlt="A man viewing financial data"
                cardHeader="Easy Overview"
                cardDescription="A dashboard designed to provide an easy to understand overview of your finances"
            />
            <LandingPageCard 
                imageSource={manageMoney}
                imageAlt="A piggy-bank on top of coins with a computer screen showing some charts"
                cardHeader="Detailed Insights"
                cardDescription="Dive deeper into your finances with detailed views of your accounts and portfolio"
            />
            <LandingPageCard 
                imageSource={savingsGoals}
                imageAlt="A man looking through a telescope to the top of a mountain that has a coin at its peak"
                cardHeader="Set Savings Goals"
                cardDescription="The ability to set individual savings goals. Perhaps it's a holiday? or a new car? Keep track of progress towards your goals!"
            />
        </Box>
    </Container>
  )
}

export default FeatureSection