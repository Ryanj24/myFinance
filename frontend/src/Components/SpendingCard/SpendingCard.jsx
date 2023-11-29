import React from 'react'
import './SpendingCard.css'

const SpendingCard = ({icon, name, amount}) => {
  return (
    <li className='spending-card'>
        <div className="card-name">
            {icon}{name}
        </div>
        <div className="card-amount">
            {amount}
        </div>
    </li>
  )
}

export default SpendingCard