export const calculateShareHolding = (transactions, companyName, portfolioID) => {
    const allTransactions = transactions.filter(transaction => transaction.company_name === companyName && transaction.portfolio_id === portfolioID)
    let total = 0;

    allTransactions.forEach(transaction => {
        if (transaction.type === "Buy") {
            total += transaction.quantity
        } else {
            total -= transaction.quantity
        }
    })

    return total
}