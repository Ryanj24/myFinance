import React from 'react'
import TopNavbar from '../../Components/TopNavbar/TopNavbar.jsx'
import HeaderSection from './HeaderSection/HeaderSection.jsx'
import FeatureSection from './FeatureSection/FeatureSection.jsx'
import FAQSection from './FAQSection/FAQSection.jsx'



const LandingPage = () => {
  return (
    <>
        <TopNavbar />
        <HeaderSection />
        <FeatureSection />
        <FAQSection />
    </>
  )
}

export default LandingPage