import React, {useState} from 'react'
import './Portfolios.css'
import { Add } from '@mui/icons-material'
import PortfoliosSort from '../../Components/PortfoliosSort/PortfoliosSort'
import PortfoliosList from '../../Components/PortfoliosList/PortfoliosList'
import PortfolioModal from '../../Components/PortfolioModal/PortfolioModal'
import PortfolioNav from '../../Components/PortfolioNav/PortfolioNav'
import CompanySearch from '../../Components/CompanySearch/CompanySearch'

const Portfolios = () => {

  const [portfolioModal, setPortfolioModal] = useState(false);
  const [selectedTab, setSelectedTab] = useState("My Portfolios");

  return (
    <>
      {portfolioModal && <PortfolioModal modalType="Add Portfolio" toggleModal={setPortfolioModal}/>}
      <section className='portfolios-container'>
        <header className='portfolios-header'>
          <h1>Stock Portfolios</h1>
          <div className="portfolios-action-btn">
            <button className='create-portfolio-btn' onClick={() => setPortfolioModal(!portfolioModal)}>
              <Add /> Create Portfolio
            </button>
          </div>
        </header>

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