import React from 'react'
import './ListCard.css'

const ListCard = ({icon, name, amount}) => {
  return (
    <li className='list-card'>
      <div className="card-name">
          {icon}{name}
      </div>
      <div className="card-amount">
          {amount}
      </div>
    </li>
  )
}

export default ListCard