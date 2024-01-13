import React from 'react'
import './BudgetCategoryDetails.css'
import BudgetCategoryCard from '../BudgetCategoryCard/BudgetCategoryCard';

const BudgetCategoryDetails = ({budgetData}) => {

  return (
    <ul className='budget-detail-categories'>
      {budgetData.map((category, index) => (
        <BudgetCategoryCard 
        key={index + 1} 
        index={index}
        categoryName={category.category}
        categoryTotal={category.total}/>
      ))}
    </ul>
  )
}

export default BudgetCategoryDetails