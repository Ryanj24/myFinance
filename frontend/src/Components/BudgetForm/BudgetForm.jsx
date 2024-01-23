import React, {useEffect, useState} from 'react'
import './BudgetForm.css'
import { useForm } from 'react-hook-form'
import { Button } from '@mui/material'
import { populateYears } from '../../utilityFunctions/populateYears'
import { budgetIconArray } from '../DashboardCards/Budget'
import { budgetFormRequests } from '../../utilityFunctions/budgetFormRequests'
import { useDispatch, useSelector } from 'react-redux'
import { addBudget, updateBudget } from '../../redux/budgetSlice'

const BudgetForm = ({formType, toggleModal}) => {


  const {token} = useSelector(state => state.user.user)
  const {budgets} = useSelector(state => state.budgets)
  const dispatch = useDispatch()
  let selectedBudget;

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


  const {register, handleSubmit, formState: {isSubmitSuccessful}, watch, setValue} = useForm({
    defaultValues: {
      month_selection: monthOptions[0] , 
      year_selection: yearOptions[0],
      housing_budget: 0,
      transportation_budget: 0,
      food_budget: 0,
      utilities_budget: 0,
      medicalhealthcare_budget: 0,
      personal_budget: 0,
      entertainment_budget: 0,
      other_budget:  0
    }
  });

  const handleOnSubmit = async (data) => {

    if (selectedBudget === undefined) {
      const request = await budgetFormRequests(data, "POST", token)

      dispatch(addBudget(request))
    } else {
      const request = await budgetFormRequests(data, "PATCH", token)

      dispatch(updateBudget(request))
    }
  }

  useEffect(() => {
    selectedBudget = budgets.filter(budget => budget.month === watch("month_selection") && budget.year == watch("year_selection"))[0]

    setValue("housing_budget", selectedBudget === undefined ? 0 : +selectedBudget.housing)
    setValue("transportation_budget", selectedBudget === undefined ? 0 : +selectedBudget.transportation)
    setValue("food_budget", selectedBudget === undefined ? 0 : +selectedBudget.food)
    setValue("utilities_budget", selectedBudget === undefined ? 0 : +selectedBudget.utilities)
    setValue("medicalhealthcare_budget", selectedBudget === undefined ? 0 : +selectedBudget.medical_healthcare)
    setValue("personal_budget", selectedBudget === undefined ? 0 : +selectedBudget.personal)
    setValue("entertainment_budget", selectedBudget === undefined ? 0 : +selectedBudget.entertainment)
    setValue("other_budget", selectedBudget === undefined ? 0 : +selectedBudget.other)

  }, [watch("month_selection"), watch("year_selection")])


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
            <input type="number" step="0.01" id={`${category.name.replaceAll(" ", "").replaceAll("&", "-").toLowerCase()}_budget`} {...register(`${category.name.replaceAll(" ", "").replaceAll("&", "").toLowerCase()}_budget`)} min={0} required/>
          </div>  
        ))}
      <div className="save-btn-container">
        <Button variant='contained' sx={{textTransform: "none", borderRadius: "10px"}} type='submit'>Set Budget</Button>
      </div>
    </form>
  )
}

export default BudgetForm