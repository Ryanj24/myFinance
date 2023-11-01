import validator from 'validator'

export const validateUserCredentials = (email, password) => {

    if (!email || !password) {
        return {validated: false, message: "Please provide both an email and a password"}
    }

    if (!validator.isEmail(email)) {
        return {validated: false, message: "Please provide a valid email address"}
    }

    if (!validator.isStrongPassword(password)) {
        return {validated: false, message: "Please provide a stronger password"}
    }

    return {validated: true, message: "Credentials provided are valid"}
}