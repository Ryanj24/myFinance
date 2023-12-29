export const sharesTransaction = async (transactionType, data, selectedPortfolioID, userToken) => {

    let response;

    if (transactionType === "Buy Shares") {
        response = await sharesPurchase(data, selectedPortfolioID, userToken)

        return response
    } else {
        response = await sharesSale(data, selectedPortfolioID, userToken)

        return response
    }
}

const sharesPurchase = async (data, portfolioID, userToken) => {
    try {
        const request = await fetch(`http://localhost:3000/api/portfolios/${portfolioID}`, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userToken}`
            },
            body: JSON.stringify({
                companyName: data.company_name,
                companyTicker: data.tickerSymbol,
                transactionType: "Buy",
                shareQuantity: data.shares_amount,
                sharePrice: data.pricePerShare
            })
        })
        
        const response = await request.json()

        return response
    } catch (error) {
        return {error: true, message: error.message}
    }
}

const sharesSale = async (data, portfolioID, userToken) => {
    try {
        const request = await fetch(`http://localhost:3000/api/portfolios/${portfolioID}`, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userToken}`
            },
            body: JSON.stringify({
                companyName: data.company_name,
                companyTicker: data.tickerSymbol,
                transactionType: "Sell",
                shareQuantity: data.shares_amount,
                sharePrice: data.pricePerShare
            })
        })
        
        const response = await request.json()

        return response
    } catch (error) {
        return {error: true, message: error.message}
    }
}