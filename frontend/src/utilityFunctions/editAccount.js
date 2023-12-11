export const editAccount = async (accountID, data, userToken) => {
    try {
        const request = await fetch(`http://localhost:3000/api/accounts/${accountID}`, {
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