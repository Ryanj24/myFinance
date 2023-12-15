import { db } from "../database/database.js"
import jwt from 'jsonwebtoken'

export const getUserAccounts = async (req, res) => {

    // Get the user object from the request headers
    const token = req.headers.authorization.split(" ")[1]
    const {id} = jwt.decode(token)

    // Get all bank accounts belonging to the user making the request
    const accounts = await db.query(`SELECT id, account_name, account_number, account_provider,balance FROM bank_accounts WHERE account_owner_id = ?`, [id])

    const transactions = await db.query(`SELECT * FROM bank_transactions WHERE account_id IN (SELECT id FROM bank_accounts WHERE account_owner_id = ?)`, [id])

    // Return the array of accounts
    return res.json({bankAccounts: accounts[0], bankTransactions: transactions[0]})
}

export const createNewAccount = async (req, res) => {

    // Get the user object from the request headers
    const token = req.headers.authorization.split(" ")[1]
    const {id} = jwt.decode(token)

    try {
        // Insert the account name and number into the bank accounts table and specify the owner of the account is the user making the request
        const query = await db.query(
            `INSERT INTO bank_accounts (account_name, account_number, balance, account_provider, account_owner_id)
             VALUES (?, ?, ?, ?, ?)
            `, [req.body.account_name, req.body.account_number, req.body.account_balance, req.body.account_provider, id]
        )

        // Retrieve the newly inserted account 
        const account = await db.query(`SELECT * FROM bank_accounts WHERE account_number = ?`, [req.body.account_number])

        // Return the new account
        return res.json(account[0][0]);
        
    } catch (error) {
        // Return any error
        return res.json(error)
    }
    
}

export const createTransaction = async (req, res) => {

    // Get the user object from the request headers
    const token = req.headers.authorization.split(" ")[1]
    const {id} = jwt.decode(token)

    // Get the date of the transaction in the format yyyy-mm-dd
    let dateOfTransaction = new Date(req.body.transaction_date);
    dateOfTransaction = dateOfTransaction.toISOString().split("T")[0];

    try {
        // Call the bank_transaction_procedure, passing in the relevant arguments
        const procedureCall = await db.query(
            `CALL bank_transaction_procedure(?, ?, ?, ?, ?, ?, ?)`, 
            [req.params.id, req.body.transaction_type, id, req.body.transaction_amount, req.body.transaction_desc, req.body.transaction_category, dateOfTransaction]
        )

        // Select the account where the transaction was made
        const addedTransaction = await db.query(`SELECT * FROM bank_transactions WHERE account_id = ? ORDER BY id DESC LIMIT 1`, [req.params.id])

        // Return the account
        return res.json(addedTransaction[0][0]);

    } catch (error) {
        // Return any errors
        return res.json(error);
    }
}

export const updateTransaction = async (req, res) => {

    // Get the user object from the request headers
    const token = req.headers.authorization.split(" ")[1]
    const {id} = jwt.decode(token)

    try {
        // Update the details of the specified transaction in the database
        const update = await db.query()

        // Retrieve that account that has been updated
        const updatedTransaction = await db.query()

        // Return the newly updated account to the user
        return res.json(updatedTransaction[0][0]);

    } catch (error) {
        // Return any error
        return res.json(error)
    }
    
}

export const updateAccount = async (req, res) => {

    // Get the user object from the request headers
    const token = req.headers.authorization.split(" ")[1]
    const {id} = jwt.decode(token)

    try {
        // Update the details of the specified account in the database
        const update = await db.query(
            `UPDATE bank_accounts SET account_name = ?, account_number = ?, balance = ?, account_provider = ? WHERE id = ? AND account_owner_id = ?`,
            [req.body.account_name, req.body.account_number, req.body.account_balance, req.body.account_provider, req.params.id, id]
        )

        // Retrieve that account that has been updated
        const updatedAccount = await db.query(`SELECT * FROM bank_accounts WHERE account_number = ?`, [req.body.account_number])

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