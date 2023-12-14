export const addTransaction = async (accountID, data, userToken) => {

    try {

        const request = await fetch(`http://localhost:3000/api/accounts/${accountID}`, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userToken}`
            },
            body: JSON.stringify({
                transaction_category: data.transaction_category,
                transaction_type: data.transaction_type,
                transaction_date: data.transaction_date,
                transaction_amount: parseInt(data.transaction_amount),
                transaction_desc: data.transaction_desc
            })
        })

        const response = await request.json()

        return response
    } catch (error) {
        return error
    }
}