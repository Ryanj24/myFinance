import React from 'react'
import { useForm } from 'react-hook-form'
import { ArrowRightAlt } from '@mui/icons-material';

const DashboardBudgetForm = ({setSelectedMonth, setSelectedYear}) => {

    const {register, handleSubmit} = useForm();

    const onSubmit = async (data, e) => {
        e.preventDefault();
        setSelectedMonth(data["month-selector"])
        setSelectedYear(parseInt(data["year-selector"], 10))
        // console.log(data)
    }

  return (
    <form id='budget-date-selector-form' onSubmit={handleSubmit(onSubmit)}>
        <select name="months" id="month-selector" {...register("month-selector")}>
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
        </select>
        <select name="year" id="year-selector" {...register("year-selector")}>
            <option value="2020">2020</option>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
        </select>
        <button type="submit">
            <ArrowRightAlt />
        </button>
    </form>
  )
}

export default DashboardBudgetForm