import { fetchCompanyLogo } from "./fetchCompanyData";

let sharesHeld = new Map()
let totalPurchasePrices = new Map()

export const calculateHoldings = (portfolioID, allTransactions) => {

    sharesHeld = new Map();
    totalPurchasePrices = new Map()
    let holdingID = 1;

    const portfolioTransactions = allTransactions.filter(transaction => transaction.portfolio_id == portfolioID)

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
        return {id: item[1]["id"], company_name: item[0], company_ticker: item[1]["ticker"], shares: item[1]["quantity"], avgPurchasePrice: +(totalPurchasePrices.get(item[0]) / item[1]["quantity"]).toFixed(2)}
    })

    // holdingsArray = await holdingsWithLogos(holdingsArray)

    return holdingsArray
}

const holdingsWithLogos = async (holdingsArr) => {
    let returnArray = [];

    for (let obj of holdingsArr) {
        const logo = await fetchCompanyLogo(obj.company_ticker)

        const json = await logo.json()

        returnArray.push({...obj, logo: json})
    }

    return returnArray
}