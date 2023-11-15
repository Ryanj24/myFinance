import { db } from "../database/database.js";
import { validateUserCredentials } from "../utilityFunctions/validateUserCredentials.js";
import { createToken } from "../utilityFunctions/createJWT.js";
import bcrypt from 'bcrypt'

// User login controller function
export const loginUser = async (req, res) => {

    // Validate the credentials provided in the login form by the user are valid
    const validCredentials = validateUserCredentials("Login", req.body.email, req.body.password)

    // If the credentials provided aren't valid, send the reason why back to the user
    if (!validCredentials.validated) {
        return res.json({error: true, field: validCredentials.field, message: validCredentials.message})
    }

    // Check to see if a user with the email provided exists in the database
    const user = await db.query(`SELECT * FROM users WHERE email = ?`, [req.body.email])

    // If no user exists with that email, alert the user that this is the case
    if (!user[0][0]) {
        return res.json({error: true, field: "email", message: "No User exists with that email"})
    }

    // Get & store the password from the user object returned from the database and then remove it from the object to be used in the jwt
    const userPassword = user[0][0].password;
    delete user[0][0].password;

    // Check that the password provided by the user matches the hashed password in the database
    const passwordsMatch = await bcrypt.compare(req.body.password, userPassword);

    // If passwords don't match, alert the user that the password provided is incorrect
    if (!passwordsMatch) {
        return res.json({error: true, field: "password", message: "Incorrect password"})
    }

    // Create a jsonwebtoken using the user object retreived from the database minus the password field
    const token = createToken(user[0][0])

    // Return an object containing the user that has been logged in along with the jsonwebtoken 
    return res.json({error: false, user: user[0][0], token})


}

export const registerUser = async (req, res) => {

    // Check that a user exists with the email provided by the user
    const userExists = await db.query(`SELECT email FROM users WHERE email = ?`, [req.body.email])

    // If a user exists, alert the user that a user with the email they have provided already exists in the database 
    if (userExists[0][0]) {
        return res.json({error: true, field: "email", message: "User with that email already exists"})
    }
    
    // Check that the email, password & date of birth provided by the user in the register form are valid
    const validCredentials = validateUserCredentials("Register", req.body.email, req.body.password, req.body.date_of_birth);

    // If the credentials are not valid, alert the user as to the reason why
    if (!validCredentials.validated) {
        return res.json({error: true, field: validCredentials.field, message: validCredentials.message})
    }

    // Create a salt to be used in the password hash
    const salt = await bcrypt.genSalt(15);

    // Hash the password provided by the user along with the salt generated above
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    try {
        // Insert the user into the database
        const response = await db.query(
            `INSERT INTO users (first_name, last_name, email, password, date_of_birth)
             VALUES (?, ?, ?, ?, ?)`,
             [req.body.first_name, req.body.last_name, req.body.email, hashedPassword, req.body.date_of_birth]
        );

        // Return a success message to alert the user that they have successfully registered
        return res.json({message: "User successfully registered"});
    } catch (error) {

        // Return any error message
        return res.json(error)
    }
}