import React, { useState } from 'react'
import './PortfolioDetailsHeader.css'
import { Edit, Delete } from '@mui/icons-material'
import PortfolioModal from '../PortfolioModal/PortfolioModal'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { deletePortfolio } from '../../redux/portfolioSlice'
import { removePortfolio } from '../../utilityFunctions/removePortfolio'

const PortfolioDetailsHeader = () => {

    const [editModal, setEditModal] = useState(false)
    const {id} = useParams()
    const nav = useNavigate()
    const dispatch = useDispatch()
    const {token} = useSelector(state => state.user.user)
    const {portfolios} = useSelector(state => state.portfolios)


    const selectedPortfolio = portfolios.filter(portfolio => portfolio.id == id)[0]

    const handleDelete = async () => {
        const response = await removePortfolio(id, token);
    
        dispatch(deletePortfolio(response))
        nav("/home/portfolios")
    }

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
            <button className='portfolio-delete-btn' onClick={handleDelete}>
                <Delete /> Delete Portfolio
            </button>
            </div>
        </header>
    </>
  )
}

export default PortfolioDetailsHeader