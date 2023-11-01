import { db } from "../database/database.js";
import { validateUserCredentials } from "../utilityFunctions/validateUserCredentials.js";
import { createToken } from "../utilityFunctions/createJWT.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const getUsers = async () => {

    const result = await db.query(`SELECT * FROM users`)

    return result[0]
}

export const loginUser = async (req, res) => {

    const validCredentials = validateUserCredentials("Login", req.body.email, req.body.password)
    if (!validCredentials.validated) {
        return res.json({error: true, message: validCredentials.message})
    }

    const user = await db.query(`SELECT * FROM users WHERE email = ?`, [req.body.email])
    if (!user[0][0]) {
        return res.json({error: true, message: "No User exists with that email"})
    }

    const userPassword = user[0][0].password;
    delete user[0][0].password;

    const passwordsMatch = await bcrypt.compare(req.body.password, userPassword);
    if (!passwordsMatch) {
        return res.json({error: true, message: "Incorrect password"})
    }

    const token = createToken(user[0][0])

    return res.json({error: false, user: user[0][0], token})


}

export const registerUser = async (req, res) => {

    const userExists = await db.query(`SELECT email FROM users WHERE email = ?`, [req.body.email])

    if (userExists[0][0]) {
        return res.json({error: true, message: "User with that email already exists"})
    }
    
    const validCredentials = validateUserCredentials("Register", req.body.email, req.body.password);

    if (!validCredentials.validated) {
        return res.json({error: true, message: validCredentials.message})
    }

    const salt = await bcrypt.genSalt(15);

    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    try {
        const response = await db.query(
            `INSERT INTO users (first_name, last_name, email, password, date_of_birth)
             VALUES (?, ?, ?, ?, ?)`,
             [req.body.first_name, req.body.last_name, req.body.email, hashedPassword, req.body.date_of_birth]
        );

        return res.json({message: "User successfully registered"});
    } catch (error) {
        return res.json(error)
    }
}