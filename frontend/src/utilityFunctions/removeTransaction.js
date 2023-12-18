export const removeTransaction = async (transactionID, accountID, userToken) => {
    try {
        const request = await fetch(`http://localhost:3000/api/accounts/${accountID}/transaction/${transactionID}`, {
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