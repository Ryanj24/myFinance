import React from "react";

const BudgetChartLabel = ({viewBox, spent, budget, viewingPage}) => {
    const {cx, cy} = viewBox;
  
    return (
      <>
      {viewingPage === "Dashboard"
      ?
        <g>
          <text x={cx} y={cy - 30} textAnchor='middle'>
            Total Spent:
          </text>
          <text x={cx} y={cy - 10} textAnchor='middle'>
            {Intl.NumberFormat("en-UK", {style:"currency", currency: "GBP"}).format(spent)}
          </text>
          <text x={cx} y={cy + 20} textAnchor='middle'>
            Total Budget:
          </text>
          <text x={cx} y={cy + 40} textAnchor='middle'>
            {Intl.NumberFormat("en-UK", {style:"currency", currency: "GBP"}).format(budget)}
          </text>
        </g>
      :
        <g>
          <text x={cx} y={cy - 10} textAnchor='middle'>
            Budget
          </text>
          <text x={cx} y={cy + 20} textAnchor='middle'>
            {Intl.NumberFormat("en-UK", {style:"currency", currency: "GBP"}).format(budget)}
          </text>
        </g>

      }
      </>
    )
}

export default BudgetChartLabel