export const createAccount = async (data, userToken) => {
    try {
        const request = await fetch(`http://localhost:3000/api/accounts/`, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userToken}`
            },
            body: JSON.stringify({
                account_name: data.account_name,
                account_number: parseInt(data.account_number),
                account_balance: parseInt(data.account_balance),
                account_provider: data.account_provider
            })
        })

        const response = await request.json()

        return response
    } catch (error) {
        return error
    }
}