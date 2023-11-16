import { useDispatch } from 'react-redux'
import { setAccounts } from '../redux/accountSlice.js'

export const fetchUserData = async (userToken) => {

    try {
        const request = await fetch(`http://localhost:3000/api/accounts/`, {
            method: "GET",
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