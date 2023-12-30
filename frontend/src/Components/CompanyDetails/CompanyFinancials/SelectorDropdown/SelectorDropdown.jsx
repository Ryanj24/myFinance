import React from 'react'
import './SelectorDropdown.css'

const SelectorDropdown = ({chartType, chartPeriod, sharePricePeriod, setChartPeriod, setSharePricePeriod}) => {
  return (
    <div className='selector-dropdown'>
        <h3>Period Selector</h3>
        {chartType === "Share Price"
        ?
            <form>
                <div>
                    <input type="radio" id='one-month-choice' value="one-month" name="chartPeriod" onClick={() => setSharePricePeriod("one-month")} defaultChecked = {sharePricePeriod === "one-month" ? true : false}/>
                    <label htmlFor="one-month-choice" id='one-month-label'>1 Month</label>
                </div>
                <div>
                    <input type="radio" id='six-month-choice' value="six-month" name="chartPeriod" onClick={() => setSharePricePeriod("six-month")} defaultChecked = {sharePricePeriod === "six-month" ? true : false}/>
                    <label htmlFor="six-month-choice" id='six-month-label'>6 Months</label>
                </div>
                <div>
                    <input type="radio" id='one-year-choice' value="one-year" name="chartPeriod" onClick={() => setSharePricePeriod("one-year")} defaultChecked = {sharePricePeriod === "one-year" ? true : false}/>
                    <label htmlFor="one-year-choice" id='one-year-label'>1 Year</label>
                </div>
            </form>
        :
            <form>
                <div>
                    <input type="radio" id='annual-choice' value="annual" name="chartPeriod" onClick={() => setChartPeriod("annual")} defaultChecked = {chartPeriod === "annual" ? true : false}/>
                    <label htmlFor="annual-choice" id='annual-label'>Annual</label>
                </div>
                <div>
                    <input type="radio" id='quarterly-choice' value="quarter" name="chartPeriod" onClick={() => setChartPeriod("quarterly")} defaultChecked = {chartPeriod === "quarterly" ? true : false}/>
                    <label htmlFor="quarterly-choice" id='quarterly-label'>Quarterly</label>
                </div>
            </form>
        }
    </div>
  )
}

export default SelectorDropdown