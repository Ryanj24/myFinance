import React, { useState } from 'react'
import './PortfolioDetailsHeader.css'
import { Edit, Delete } from '@mui/icons-material'
import PortfolioModal from '../PortfolioModal/PortfolioModal'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PortfolioDetailsHeader = () => {

    const [editModal, setEditModal] = useState(false)
    const {id} = useParams()
    const {portfolios} = useSelector(state => state.portfolios)

    const selectedPortfolio = portfolios.filter(portfolio => portfolio.id == id)[0]

    console.log("Portfolio Details Header Re-render")

  return (
    <> 
        {editModal && <PortfolioModal modalType="Edit Portfolio" toggleModal={setEditModal} portfolio={selectedPortfolio}/>} 
        <header className='portfolio-header'>
            <h1>
            Portfolio Overview
            </h1>
            <div className="portfolio-action-btns">
            <button className='portfolio-edit-btn' onClick={() => setEditModal(true)}>
                <Edit /> Edit Portfolio
            </button>
            <button className='portfolio-delete-btn'>
                <Delete /> Delete Portfolio
            </button>
            </div>
        </header>
    </>
  )
}

export default PortfolioDetailsHeader