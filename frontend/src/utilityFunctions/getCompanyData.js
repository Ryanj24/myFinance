export const getCompanyData = async (ticker, userToken) => {

    const request = await fetch(`http://localhost:3000/api/portfolios/companySearch/${ticker}`, {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${userToken}`
        },
        body: JSON.stringify({
            companyTicker: ticker
        })
    })

    const response = await request.json()

    return response
}