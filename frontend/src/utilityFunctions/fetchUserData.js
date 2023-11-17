export const fetchUserData = async (userToken) => {

    try {
        const accountsRequest = await fetch(`http://localhost:3000/api/accounts/`, {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userToken}`
            }
        })

        const accounts = await accountsRequest.json()

        const portfolioRequest = await fetch(`http://localhost:3000/api/portfolios/`, {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userToken}`
            }
        })

        const portfolios = await portfolioRequest.json()

        return {accounts, portfolios}
    } catch (error) {
        return error
    }

}