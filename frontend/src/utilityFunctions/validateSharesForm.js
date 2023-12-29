export const validateSharesForm = (transactionType, data, selectedPortfolio) => {
    let returnObj;

    if (transactionType === "Buy Shares") {
        if (selectedPortfolio.balance < data.transactionTotal) {
            returnObj = {valid: false, reason: `Portfolio balance of $${selectedPortfolio.balance} is too low`}
        } else {
            returnObj = {valid: true}
        }
    } else {
        if (data.currentSharesHeld < data.shares_amount) {
            returnObj = {valid: false, reason: `Portfolio only has a total of ${data.currentSharesHeld} shares in ${data.company_name}`}
        } else {
            returnObj = {valid: true}
        }
    }

    return returnObj
}