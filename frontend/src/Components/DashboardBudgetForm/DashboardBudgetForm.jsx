import React from 'react'
import { useForm } from 'react-hook-form'
import { Search } from '@mui/icons-material';
import { populateYears } from '../../utilityFunctions/populateYears';

const DashboardBudgetForm = ({setSelectedMonth, setSelectedYear}) => {

    const yearOptions = populateYears();
    const {register, handleSubmit} = useForm();

    const onSubmit = async (data, e) => {
        e.preventDefault();
        setSelectedMonth(data["month-selector"])
        setSelectedYear(parseInt(data["year-selector"], 10))
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
            {yearOptions.map(year => (
                <option value={year} key={year}>{year}</option>
            ))}
        </select>
        <button type="submit">
            <Search />
        </button>
    </form>
  )
}

export default DashboardBudgetForm