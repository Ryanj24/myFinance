export const currentStockPrice = async (ticker, userToken) => {

    try {
        const request = await fetch(`http://localhost:3000/api/portfolios/companyPrice/${ticker}`, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userToken}`
            },
            body: JSON.stringify({companyTicker: ticker})
        })

        const response = await request.json()

        return response

    } catch (error) {
        return error
    }
}