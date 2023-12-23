import React, { useState } from 'react'
import './GridCarousel.css'
import { ArrowBackIosNew } from '@mui/icons-material'
import CompanyOverview from '../CompanyDetails/CompanyOverview/CompanyOverview'
import CompanyMetrics from '../CompanyDetails/CompanyMetrics/CompanyMetrics'
import CompanyFinancials from '../CompanyDetails/CompanyFinancials/CompanyFinancials'

const data = [
    "Overview", "Metrics"
]

const GridCarousel = ({items}) => {

    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleOnClick = (newIndex) => {
        if (newIndex < 0) {
            newIndex = 0
        } else if (newIndex > items.length - 1) {
            newIndex = items.length - 1
        }
        setSelectedIndex(newIndex)
    }

  return (
    <div className='grid-carousel'>
        <button onClick={() => handleOnClick(selectedIndex - 1)} className='back-button'>
            <ArrowBackIosNew />
        </button>
        <div className="overview">
            {/* {items[selectedIndex]} */}
            {/* <CompanyOverview company={items}/> */}
            {/* <CompanyMetrics company={items}/> */}
            {<CompanyFinancials company={items}/>}
        </div>
        <button onClick={() => handleOnClick(selectedIndex + 1)} className='forward-button'>
            <ArrowBackIosNew sx={{rotate: "180deg"}} />
        </button>
    </div>
  )
}

export default GridCarousel