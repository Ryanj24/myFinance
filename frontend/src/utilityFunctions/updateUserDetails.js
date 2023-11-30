export const updateUserDetails = async (data, token) => {
    try {
        const request = await fetch(`http://localhost:3000/api/users/update`, {
            method: "PATCH",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })

        const response = await request.json()

        return response
    } catch (error) {
        return error
    }
}