import { db } from "../database/database.js";
import { validateUserCredentials } from "../utilityFunctions/validateUserCredentials.js";

export const getUsers = async () => {

    const result = await db.query(`SELECT * FROM users`)

    return result[0]
}

export const loginUser = async (req, res) => {

}

export const registerUser = async (req, res) => {

    const userExists = await db.query(`SELECT * FROM users WHERE email = '${req.body.email}'`)

    if (userExists[0][0]) {
        return res.json({error: true, message: "User with that email already exists"})
    }
    
    const validCredentials = validateUserCredentials(req.body.email, req.body.password);

    if (!validCredentials.validated) {
        return res.json({error: true, message: validCredentials.message})
    }

    return res.json({error: false, message: "Successfully registered"})
}