import React from 'react'
import './BudgetCategoryCard.css'
import { Home, Commute, Fastfood, HomeRepairService, HealthAndSafety, DevicesOther, ConfirmationNumber, MoreHoriz } from '@mui/icons-material';
import { Typography } from '@mui/material';

const iconArray = [<Home sx={{color: "#FFF"}}/>, <Commute sx={{color: "#FFF"}}/>, <Fastfood sx={{color: "#FFF"}}/>, <HomeRepairService sx={{color: "#FFF"}}/>, <HealthAndSafety sx={{color: "#FFF"}}/>, <DevicesOther sx={{color: "#FFF"}}/>, <ConfirmationNumber sx={{color: "#FFF"}}/>, <MoreHoriz sx={{color: "#FFF"}}/>]
const iconColours = ['#FD3C17', '#407BFF', '#FFA500', '#17FDE0', '#4EFD17', '#808080', '#FD17F6', '#C0C0C0']


const BudgetCategoryCard = ({categoryName, categoryTotal, index}) => {
  return (
    <div className='budget-category'>
        <div className="category-icon">
            <div className="wrapper" style={{backgroundColor: `${iconColours[index]}`}}>
                {iconArray[index]}
            </div>
        </div>
        <div className="category-name">
            <Typography variant='h5' component="h5">{categoryName}</Typography>
        </div>
        <div className="category-allocated-budget">
            <p>{Intl.NumberFormat("en", {style: "currency", currency: "GBP"}).format(categoryTotal)}</p>
        </div>
    </div>
  )
}

export default BudgetCategoryCard