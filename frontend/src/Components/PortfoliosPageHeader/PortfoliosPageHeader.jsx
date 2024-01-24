import React, {useState} from 'react'
import './PortfoliosPageHeader.css'
import { Add } from '@mui/icons-material'
import PortfolioModal from '../../Components/PortfolioModal/PortfolioModal'

const PortfoliosPageHeader = () => {

    const [portfolioModal, setPortfolioModal] = useState(false);

  return (
    <>
        {portfolioModal && <PortfolioModal modalType="Add Portfolio" toggleModal={setPortfolioModal}/>}
        <header className='portfolios-page-header'>
            <h1>Stock Portfolios</h1>
            <div className="portfolios-action-btn">
                <button className='create-portfolio-btn' onClick={() => setPortfolioModal(!portfolioModal)}>
                    <Add /> Create Portfolio
                </button>
            </div>
        </header>
    </>
  )
}

export default PortfoliosPageHeader