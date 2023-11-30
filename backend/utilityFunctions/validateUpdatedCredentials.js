import validator from "validator";

export const validateUpdatedCredentials = (first_name, last_name, email, dob) => {
    const currentDate = new Date().getFullYear();
    const providedDOB = new Date(dob).getFullYear();

    if (!first_name || first_name.trim() == "") {
        return {validated: false, field: "first_name", message: "Please provide a valid first name"}
    }

    if (!last_name || last_name.trim() == "") {
        return {validated: false, field: "last_name", message: "Please provide a valid last name"}
    }

    if (!email) {
        return {validated: false, field: "email", message: "Please provide a valid email address"}
    }

    if (!validator.isEmail(email)) {
        return {validated: false, field: "email", message: "Please provide a valid email address"}
    }
    
    if (currentDate - providedDOB < 18) {
        return {validated: false, field: "date_of_birth", message: "You must be 18 or over to open an account with myFinance"}
    }

    return {validated: true, message: "Credentials valid"}
}