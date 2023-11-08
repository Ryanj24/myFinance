
export const registerUser = async (data) => {

    try {
        const request = await fetch(`http://localhost:3000/api/users/register`, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })

        const response = await request.json()

        return response
    } catch (error) {
        return error
    }

}