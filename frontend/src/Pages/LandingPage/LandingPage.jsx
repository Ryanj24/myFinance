import React from 'react'
import LandingPageNavbar from '../../Components/LandingPageNavbar/LandingPageNavbar.jsx'
import HeaderSection from './HeaderSection/HeaderSection.jsx'
import FeatureSection from './FeatureSection/FeatureSection.jsx'
import FAQSection from './FAQSection/FAQSection.jsx'



const LandingPage = () => {
  return (
    <>
        <LandingPageNavbar />
        <HeaderSection />
        <FeatureSection />
        <FAQSection />
    </>
  )
}

export default LandingPage