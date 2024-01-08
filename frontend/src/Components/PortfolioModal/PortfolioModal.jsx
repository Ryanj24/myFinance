import React from 'react'
import './PortfolioModal.css'
import { Close } from '@mui/icons-material'
import PortfolioForm from '../PortfolioForm/PortfolioForm'
import SharesForm from '../SharesForm/SharesForm'

const PortfolioModal = ({modalType, toggleModal, portfolio, company}) => {

  return (
    <div className='portfolio-modal-container'>
        <div className="portfolio-modal">
            <header className='modal-header'>
              {modalType === "Add Portfolio"
              ? <h2>Add Portfolio</h2>
              : (modalType === "Edit Portfolio") ? <h2>Edit Portfolio</h2>
              : (modalType === "Buy Shares") ? <h2>Buy Shares</h2>
              : <h2>Sell Shares</h2>  
              }
              <div className="modal-close-btn-container">
                  <button onClick={() => toggleModal(false)}>
                      <Close />
                  </button>
              </div>
            </header>
            {modalType === "Add Portfolio"
            ?
              <PortfolioForm 
                formType="Add Portfolio" 
                toggleModal={toggleModal}
              />
            : (modalType === "Edit Portfolio")
            ?
              <PortfolioForm 
                formType="Edit Portfolio" 
                portfolio={portfolio}
                toggleModal={toggleModal}
              />
            : (modalType === "Buy Shares")
            ?
              <SharesForm 
                formType="Buy Shares"
                toggleModal={toggleModal}
                company={company}
              />
            :
              <SharesForm 
                formType="Sell Shares"
                toggleModal={toggleModal}
                company={company}
              />
            }
        </div>
    </div>
  )
}

export default PortfolioModal