import React from 'react'
import { useMediaQuery } from 'react-responsive'
import SelectorDropdown from './SelectorDropdown/SelectorDropdown.jsx'

const ChartPeriodSelectors = ({chartType, chartPeriod, sharePricePeriod, setChartPeriod, setSharePricePeriod}) => {

    const smallerScreen = useMediaQuery({ query: '(max-width: 800px)' })
  return (
    <>
    {chartType === "Share Price" && !smallerScreen
    ?
        <form>
          <input type="radio" id='one-month-choice' value="one-month" name="chartPeriod" onClick={() => setSharePricePeriod("one-month")} defaultChecked = {sharePricePeriod === "one-month" ? true : false}/>
          <label htmlFor="one-month-choice" id='one-month-label'>1 Month</label>

          <input type="radio" id='six-month-choice' value="six-month" name="chartPeriod" onClick={() => setSharePricePeriod("six-month")} defaultChecked = {sharePricePeriod === "six-month" ? true : false}/>
          <label htmlFor="six-month-choice" id='six-month-label'>6 Months</label>

          <input type="radio" id='one-year-choice' value="one-year" name="chartPeriod" onClick={() => setSharePricePeriod("one-year")} defaultChecked = {sharePricePeriod === "one-year" ? true : false}/>
          <label htmlFor="one-year-choice" id='one-year-label'>1 Year</label>
        </form>
    : (chartType === "Share Price" && smallerScreen)
    ?
        <SelectorDropdown chartType="Share Price" sharePricePeriod={sharePricePeriod} setSharePricePeriod={setSharePricePeriod}/>
    : (chartType != "Share Price" && !smallerScreen)
    ?
        <form>
            <input type="radio" id='annual-choice' value="annual" name="chartPeriod" onClick={() => setChartPeriod("annual")} defaultChecked = {chartPeriod === "annual" ? true : false}/>
            <label htmlFor="annual-choice" id='annual-label'>Annual</label>

            <input type="radio" id='quarterly-choice' value="quarter" name="chartPeriod" onClick={() => setChartPeriod("quarterly")} defaultChecked = {chartPeriod === "quarterly" ? true : false}/>
            <label htmlFor="quarterly-choice" id='quarterly-label'>Quarterly</label>
        </form>
    :
        <SelectorDropdown chartPeriod={chartPeriod} setChartPeriod={setChartPeriod}/>
    }
    </>
  )
}

export default ChartPeriodSelectors