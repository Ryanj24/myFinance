export const removePortfolio = async (portfolioID, userToken) => {
    try {
        const request = await fetch(`http://localhost:3000/api/portfolios/${portfolioID}`, {
            method: "DELETE",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userToken}`
            }
        })

        const response = await request.json()

        return response
    } catch (error) {
        return error
    }
}