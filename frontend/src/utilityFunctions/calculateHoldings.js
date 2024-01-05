let sharesHeld = new Map()
let totalPurchasePrices = new Map()

export const calculateHoldings = async (portfolioID, userToken, allTransactions) => {

    sharesHeld = new Map();
    totalPurchasePrices = new Map()
    let holdingID = 1;

    const portfolioTransactions = allTransactions.filter(transaction => transaction.portfolio_id == portfolioID)

    if (portfolioTransactions.length === 0) return

    portfolioTransactions.forEach(transaction => {
        if (sharesHeld.has(transaction.company_name) && transaction.type === "Buy") {
           
            sharesHeld.set(transaction.company_name, {
                ...sharesHeld.get(transaction.company_name), 
                quantity: sharesHeld.get(transaction.company_name)["quantity"] + transaction.quantity
            })

            totalPurchasePrices.set(transaction.company_name, totalPurchasePrices.get(transaction.company_name) + +transaction.total_amount)

        } else if (sharesHeld.has(transaction.company_name) && transaction.type === "Sell") {

            sharesHeld.set(transaction.company_name, {
                ...sharesHeld.get(transaction.company_name),
                quantity: sharesHeld.get(transaction.company_name)["quantity"] - transaction.quantity
            })

        } else {


            sharesHeld.set(transaction.company_name, {
                id: holdingID,
                ticker: transaction.company_ticker, 
                quantity: transaction.quantity
            })

            totalPurchasePrices.set(transaction.company_name, +transaction.total_amount)

            holdingID++;
        }
    })


    let holdingsArray = Array.from(sharesHeld, (item) => {
        return {
            id: item[1]["id"], 
            company_name: item[0],
            company_ticker: item[1]["ticker"],
            shares: item[1]["quantity"],
            avgPurchasePrice: +(totalPurchasePrices.get(item[0]) / item[1]["quantity"]).toFixed(2)}
    }).filter(holding => holding.shares > 0)

    
    holdingsArray = await fetchLogos(userToken, holdingsArray)
    

    return holdingsArray
}

const fetchLogos = async (userToken, holdings) => {

    for (let i = 0; i < holdings.length; i++) {

        const request = await fetch(`http://localhost:3000/api/portfolios/companyLogo/${holdings[i].company_ticker}`, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userToken}`
            },
            body: JSON.stringify({
                companyTicker: holdings[i].company_ticker
            })
        })
    
        const response = await request.json()

        holdings[i].logoSrc = response.logo
    }

    return holdings
}