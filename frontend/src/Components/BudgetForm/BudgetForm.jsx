import React, {useEffect} from 'react'
import './BudgetForm.css'
import { useForm } from 'react-hook-form'
import { Button } from '@mui/material'
import { populateYears } from '../../utilityFunctions/populateYears'
import { budgetIconArray } from '../DashboardCards/Budget'

const BudgetForm = ({formType, toggleModal, budget}) => {

  const yearOptions = populateYears();
  const monthOptions = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  const budgetCategories = [
    {id: 1, name: "Housing"}, 
    {id: 2, name: "Transportation"}, 
    {id: 3, name: "Food"},
    {id: 4, name: "Utilities"},
    {id: 5, name: "Medical & Healthcare"},
    {id: 6, name: "Personal"}, 
    {id: 7, name: "Entertainment"}, 
    {id: 8, name: "Other"}
  ]


  const {register, handleSubmit, formState: {isSubmitSuccessful}} = useForm({
    defaultValues: {
      month_selection: formType === "Set Budget" ? monthOptions[0] : budget.month, 
      year_selection: formType === "Set Budget" ? yearOptions[0] : budget.year,
      housing_budget: formType === "Set Budget" ? 0 : budget.housing,
      transportation_budget: formType === "Set Budget" ? 0 : budget.transportation,
      food_budget: formType === "Set Budget" ? 0 : budget.food,
      utilities_budget: formType === "Set Budget" ? 0 : budget.utilities,
      medicalhealthcare_budget: formType === "Set Budget" ? 0 : budget.medical_healthcare,
      personal_budget: formType === "Set Budget" ? 0 : budget.personal,
      entertainment_budget: formType === "Set Budget" ? 0 : budget.entertainment,
      other_budget: formType === "Set Budget" ? 0 : budget.other,
    }
  });

  const handleOnSubmit = async (data) => {
    console.log(data);
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
        toggleModal(false)
    }
  }, [isSubmitSuccessful])

  return (
    <form id='budget-modal-form' onSubmit={handleSubmit(handleOnSubmit)}>
      <div className="month-selection">
          <label htmlFor='month_selection'>Month</label>
          <select name="month" id="month_selection" {...register("month_selection")}>
                {monthOptions.map((month, index) => (
                  <option value={month} key={index + 1}>{month}</option>
                ))}
          </select>
      </div>  
      <div className="year-selection">
          <label htmlFor='year_selection'>Year</label>
          <select name="year" id="year_selection" {...register("year_selection")}>
                {yearOptions.map(year => (
                  <option value={year} key={year}>{year}</option>
                ))}
          </select>
      </div> 
        {budgetCategories.map((category, index) => (
          <div className={`${category.name.replaceAll(" ", "").replaceAll("&", "-").toLowerCase()}-budget`} key={category.id}>
            <label htmlFor={`${category.name.replaceAll(" ", "").replaceAll("&", "-").toLowerCase()}_budget`}>{budgetIconArray[index]}{category.name}</label>
            <input type="number" id={`${category.name.replaceAll(" ", "").replaceAll("&", "-").toLowerCase()}_budget`} {...register(`${category.name.replaceAll(" ", "").replaceAll("&", "").toLowerCase()}_budget`)} min={0} required/>
          </div>  
        ))}
      <div className="save-btn-container">
          {formType === "Set Budget"
          ?
            <Button variant='contained' sx={{textTransform: "none", borderRadius: "10px"}} type='submit'>Set Budget</Button>
          :
            <Button variant='contained' sx={{textTransform: "none", borderRadius: "10px"}} type='submit'>Update Budget</Button>
          }
        </div>
    </form>
  )
}

export default BudgetForm