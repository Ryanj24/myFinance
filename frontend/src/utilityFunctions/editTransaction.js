export const editTransaction = async (accountID, transaction, data, userToken) => {
    try {
        const request = await fetch(`http://localhost:3000/api/accounts/${accountID}/transaction/${transaction.id}`, {
            method: "PATCH",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userToken}`
            },
            body: JSON.stringify({
                ...data,
                old_amount: transaction.amount,
                oldAmountHigher: transaction.amount - data.transaction_amount > 0 ? true : false,
                typeChange: (transaction.type === "Deposit" || transaction.type === "Income") && (data.transaction_type === "Expense" || data.transaction_type === "Withdrawl") ? true : (transaction.type === "Expense" || transaction.type === "Withdrawl") && (data.transaction_type === "Income" || data.transaction_type === "Deposit") ? true : false 
            })
        })

        const response = await request.json()

        return response
    } catch (error) {
        return error
    }
}