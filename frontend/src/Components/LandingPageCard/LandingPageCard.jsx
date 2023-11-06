import React from 'react'
import './LandingPageCard.css'
import { Typography } from '@mui/material'

const LandingPageCard = ({imageSource, imageAlt, cardHeader, cardDescription}) => {
  return (
    <div className="card-container">
        <img src={imageSource} alt={imageAlt} height={200} width={200}/>
        <Typography variant='h6'>
            {cardHeader}
        </Typography>
        <Typography variant='body2' component="p">
            {cardDescription}
        </Typography>
    </div>
  )
}

export default LandingPageCard