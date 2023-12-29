export const validateSharesForm = (transactionType, data, selectedPortfolio) => {
    let returnObj;

    if (transactionType === "Buy Shares") {
        if (selectedPortfolio.balance < data.pricePerShare * data.shares_amount) {
            returnObj = {valid: false, reason: `Portfolio balance of $${selectedPortfolio.balance} is too low`, stop: 1}
        } else {
            returnObj = {valid: true, stop: 2}
        }
    } else {
        if (data.currentSharesHeld < data.shares_amount) {
            returnObj = {valid: false, reason: `Portfolio only has a total of ${data.currentSharesHeld} shares in ${data.company_name}`, stop: 3}
        } else {
            returnObj = {valid: true, stop: 4}
        }
    }

    return returnObj
}