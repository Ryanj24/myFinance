import { db } from "../database/database.js"
import jwt from 'jsonwebtoken'

export const getUserAccounts = async (req, res) => {

    // Get the user object from the request headers
    const token = req.headers.authorization.split(" ")[1]
    const {id} = jwt.decode(token)

    // Get all bank accounts belonging to the user making the request
    const accounts = await db.query(`SELECT account_name, account_number, balance FROM bank_accounts WHERE account_owner_id = ?`, [id])

    // Return the array of accounts
    return res.json(accounts[0])
}

export const createNewAccount = async (req, res) => {

    // Get the user object from the request headers
    const token = req.headers.authorization.split(" ")[1]
    const {id} = jwt.decode(token)

    try {
        // Insert the account name and number into the bank accounts table and specify the owner of the account is the user making the request
        const query = await db.query(
            `INSERT INTO bank_accounts (account_name, account_number, account_owner_id)
             VALUES (?, ?, ?)
            `, [req.body.accountName, req.body.accountNumber, id]
        )

        // Retrieve the newly inserted account 
        const account = await db.query(`SELECT * FROM bank_accounts WHERE account_number = ?`, [req.body.accountNumber])

        // Return the new account
        return res.json(account[0][0]);
        
    } catch (error) {
        // Return any error
        return res.json(error)
    }
    
}

export const getSingleAccount = async (req, res) => {

    // Get the user object from the request headers
    const token = req.headers.authorization.split(" ")[1]
    const {id} = jwt.decode(token)

    // Select the account specified along with all transactions related to that account
    const account = await db.query(`SELECT account_name, account_number, balance FROM bank_accounts WHERE id = ? AND account_owner_id = ?`, [req.params.id, id])
    const accountTransactions = await db.query(`SELECT type, category, transaction_date, amount FROM bank_transactions WHERE account_id = ?`, [req.params.id])

    // If there is no account with the specified ID, alert this to the user
    if (!account[0][0]) {
        return res.json({error: true, message: `No account exists with the id ${req.params.id}`})
    }

    // Return an object containing the account and all its transactions
    return res.json({account: account[0][0], transactions: accountTransactions[0]})

}

export const accountTransaction = async (req, res) => {

    // Get the user object from the request headers
    const token = req.headers.authorization.split(" ")[1]
    const {id} = jwt.decode(token)

    // Get the date of the transaction in the format yyyy-mm-dd
    let dateOfTransaction = new Date();
    dateOfTransaction = dateOfTransaction.toISOString().split("T")[0];

    try {
        // Call the bank_transaction_procedure, passing in the relevant arguments
        const procedureCall = await db.query(
            `CALL bank_transaction_procedure(?, ?, ?, ?, ?, ?)`, 
            [req.params.id, req.body.transactionType, id, req.body.amount, req.body.category, dateOfTransaction]
        )

        // Select the account where the transaction was made
        const transaction = await db.query(`SELECT id, type, category, transaction_date, amount FROM bank_transactions WHERE account_id = ? ORDER BY id DESC LIMIT 1`,  [req.params.id]);

        // Return the account
        return res.json(transaction[0][0]);

    } catch (error) {
        // Return any errors
        return res.json(error);
    }
}

export const updateAccount = async (req, res) => {

    // Get the user object from the request headers
    const token = req.headers.authorization.split(" ")[1]
    const {id} = jwt.decode(token)

    try {
        // Update the details of the specified account in the database
        const update = await db.query(
            `UPDATE bank_accounts SET account_name = ?, account_number = ? WHERE id = ? AND account_owner_id = ?`,
            [req.body.accountName, req.body.accountNumber, req.params.id, id]
        )

        // Retrieve that account that has been updated
        const updatedAccount = await db.query(`SELECT * FROM bank_accounts WHERE account_number = ?`, [req.body.accountNumber])

        // Return the newly updated account to the user
        return res.json(updatedAccount[0][0]);

    } catch (error) {
        // Return any error
        return res.json(error)
    }
    
}

export const deleteAccount = async (req, res) => {
    
    // Get the user object from the request headers
    const token = req.headers.authorization.split(" ")[1]
    const {id} = jwt.decode(token)

    try {

        // Before deletion, retrieve the account specified to be deleted
        const deletedAccount = await db.query(`SELECT * FROM bank_accounts WHERE id = ?`, [req.params.id])

        // Delete the account from the database
        const deleteReq = await db.query(`DELETE FROM bank_accounts WHERE id = ?`, [req.params.id])

        // Return the account object to the user
        return res.json(deletedAccount[0][0])
    } catch (error) {
        // Return any errors
        return res.json(error)
    }
}