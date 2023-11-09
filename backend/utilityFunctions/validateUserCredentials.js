import validator from 'validator'

export const validateUserCredentials = (formType, email, password, dob) => {

    const currentDate = new Date().getFullYear();
    const providedDOB = new Date(dob).getFullYear();

    if (formType === "Register") {
        if (!email) {
            return {validated: false, field: "email", message: "Please provide a valid email address"}
        }

        if (!password) {
            return {validated: false, field: "password", message: "Please provide a password"}
        }
    
        if (!validator.isEmail(email)) {
            return {validated: false, field: "email", message: "Please provide a valid email address"}
        }
    
        if (!validator.isStrongPassword(password)) {
            return {validated: false, field: "password", message: "Please provide a stronger password"}
        }

        if (currentDate - providedDOB < 18) {
            return {validated: false, field: "date_of_birth", message: "You must be 18 or over to open an account with myFinance"}
        }
    } else {
        if (!email) {
            return {validated: false, field: "email", message: "Please provide a valid email address"}
        }

        if (!password) {
            return {validated: false, field: "password", message: "Please provide a password"}
        }
    
        if (!validator.isEmail(email)) {
            return {validated: false, field: "email", message: "Please provide a valid email address"}
        }
    }
    

    return {validated: true, message: "Credentials provided are valid"}
}