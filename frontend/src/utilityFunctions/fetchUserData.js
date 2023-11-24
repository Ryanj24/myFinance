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

        const goalRequest = await fetch(`http://localhost:3000/api/goals/`, {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userToken}`
            }
        })

        const goals = await goalRequest.json()

        // const budgetRequest = await fetch(`http://localhost:3000/api/budgets/`, {
        //     method: "GET",
        //     mode: "cors",
        //     headers: {
        //         "Content-Type": "application/json",
        //         "Authorization": `Bearer ${userToken}`
        //     }
        // })

        // const budgets = await budgetRequest.json()

        return {accounts, portfolios, goals}
    } catch (error) {
        return error
    }

}