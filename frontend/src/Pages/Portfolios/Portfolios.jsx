import React, {useState} from 'react'
import './Portfolios.css'
import { Add } from '@mui/icons-material'
import PortfoliosSort from '../../Components/PortfoliosSort/PortfoliosSort'
import PortfoliosList from '../../Components/PortfoliosList/PortfoliosList'
import AccountModal from '../../Components/AccountModal/AccountModal'
import PortfolioModal from '../../Components/PortfolioModal/PortfolioModal'

const Portfolios = () => {

  const [portfolioModal, setPortfolioModal] = useState(false);

  // console.log("Portfolio re-render")
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

        <PortfoliosSort />
        <PortfoliosList />

      </section>
    </>
  )
}

export default Portfolios