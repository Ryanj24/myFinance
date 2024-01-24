import React, {useState} from 'react'
import './Portfolios.css'
import PortfoliosSort from '../../Components/PortfoliosSort/PortfoliosSort'
import PortfoliosList from '../../Components/PortfoliosList/PortfoliosList'
import PortfoliosPageHeader from '../../Components/PortfoliosPageHeader/PortfoliosPageHeader'
import PortfolioNav from '../../Components/PortfolioNav/PortfolioNav'
import CompanySearch from '../../Components/CompanySearch/CompanySearch'

const Portfolios = () => {

  const [selectedTab, setSelectedTab] = useState("My Portfolios");

  return (
    <>
      <section className='portfolios-container'>

        <PortfoliosPageHeader />

        <PortfolioNav selectedTab={selectedTab} setSelectedTab={setSelectedTab}/>
        
        {selectedTab === "My Portfolios"
        ?
          <>
            <PortfoliosSort />
            <PortfoliosList />
          </>
        :
          <CompanySearch />
        }

      </section>
    </>
  )
}

export default Portfolios