import React from 'react'
import './FAQSection.css'
import { Container, Typography, Box, Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const FAQSection = () => {
  return (
    <Container className='faq-section' maxWidth="lg">
        <Box component="header" className='faq-section-header'>
            <Typography variant='h2' component="h2">
                Frequently Asked Questions
            </Typography>
            <Typography variant='body1' component="p">
                Below are some questions that are frequently posed to us from prospective customers
            </Typography>
        </Box>
        <Box component="section" className='questions'>
            <Accordion className='faq-accordion'>
                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{color: "var(--primary-col)"}}/>}>
                    <p>Are there any age requirements to use myFinance?</p>
                </AccordionSummary>
                <AccordionDetails>
                    <p>Yes, in order to open an account with myFinance you must be at least 18 years of age</p>
                </AccordionDetails>
            </Accordion>
            <Accordion className='faq-accordion'>
                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{color: "var(--primary-col)"}}/>}>
                    <p>I don't have a portfolio of stocks but want to just manage my money, can I use your platform?</p>
                </AccordionSummary>
                <AccordionDetails>
                    <p>Absolutely, there is no requirement to own a portfolio of stocks in order to use the platform</p>
                </AccordionDetails>
            </Accordion>
            <Accordion className='faq-accordion'>
                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{color: "var(--primary-col)"}}/>}>
                    <p>How much does it cost to use myFinance?</p>
                </AccordionSummary>
                <AccordionDetails>
                    <p>Since myFinance is and always will be a completely free platform for all users</p>
                </AccordionDetails>
            </Accordion>
        </Box>
    </Container>
  )
}

export default FAQSection