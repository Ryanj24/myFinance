import React from 'react'
import './ListCard.css'

const ListCard = ({icon, name, amount, total}) => {
  return (
    <li className='list-card'>
      <div className="card-name">
          {icon}{name}
      </div>
      <div className="card-amount">
        {total
        ?
          amount + " / " + total
        :
          amount
        }
      </div>
    </li>
  )
}

export default ListCard