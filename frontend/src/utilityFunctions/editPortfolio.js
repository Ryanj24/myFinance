export const editPortfolio = async (data, accountID, userToken) => {
    try {

        const request = await fetch(`http://localhost:3000/api/portfolios/${id}`, {
            method: "PATCH",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userToken}`
            },
            body: JSON.stringify(data)
        })

        const response = await request.json()

        return response

    } catch (error) {
        return error
    }
}