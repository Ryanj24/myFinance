import { db } from "../database/database.js"
import jwt from 'jsonwebtoken'

export const getUserAccounts = async (req, res) => {

    const token = req.headers.authorization.split(" ")[1]
    const user = jwt.decode(token)

    const accounts = await db.query(`SELECT account_name, account_number, balance FROM bank_accounts WHERE account_owner_id = ?`, [user.id])

    return res.json(accounts[0])
}

export const createNewAccount = async (req, res) => {

    const token = req.headers.authorization.split(" ")[1]
    const {id} = jwt.decode(token)

    try {
        const query = await db.query(
            `INSERT INTO bank_accounts (account_name, account_number, account_owner_id)
             VALUES (?, ?, ?)
            `, [req.body.accountName, req.body.accountNumber, id]
        )

        const account = await db.query(`SELECT * FROM bank_accounts WHERE account_number = ?`, [req.body.accountNumber])

        return res.json(account[0][0]);
        
    } catch (error) {
        return res.json(error)
    }
    
}

export const getSingleAccount = async (req, res) => {

    const token = req.headers.authorization.split(" ")[1]
    const {id} = jwt.decode(token)

    const account = await db.query(`SELECT account_name, account_number, balance FROM bank_accounts WHERE id = ? AND account_owner_id = ?`, [req.params.id, id])
    const accountTransactions = await db.query(`SELECT type, category, transaction_date, amount FROM bank_transactions WHERE account_id = ?`, [req.params.id])

    if (!account[0][0]) {
        return res.json({error: true, message: `No account exists with the id ${req.params.id}`})
    }

    return res.json({account: account[0][0], transactions: accountTransactions[0]})

}

export const accountTransaction = async (req, res) => {

    const token = req.headers.authorization.split(" ")[1]
    const {id} = jwt.decode(token)

    let dateOfTransaction = new Date();
    dateOfTransaction = dateOfTransaction.toISOString().split("T")[0];

    try {
        const transaction = await db.query(
            `CALL bank_transaction_procedure(?, ?, ?, ?, ?, ?)`, 
            [req.params.id, req.body.transactionType, id, req.body.amount, req.body.category, dateOfTransaction]
        )

        const account = await db.query(`SELECT * FROM bank_accounts WHERE id = ?`, [req.params.id])

        return res.json(account[0][0]);

    } catch (error) {
        res.json(error);
    }
}

export const updateAccount = async (req, res) => {

    const token = req.headers.authorization.split(" ")[1]
    const {id} = jwt.decode(token)

    try {
        const update = await db.query(
            `UPDATE bank_accounts SET account_name = ?, account_number = ? WHERE id = ? AND account_owner_id = ?`,
            [req.body.accountName, req.body.accountNumber, req.params.id, id]
        )

        const updatedAccount = await db.query(`SELECT * FROM bank_accounts WHERE account_number = ?`, [req.body.accountNumber])

        return res.json(updatedAccount[0][0]);

    } catch (error) {
        return res.json(error)
    }
    
}

export const deleteAccount = async (req, res) => {
    
    const token = req.headers.authorization.split(" ")[1]
    const {id} = jwt.decode(token)

    try {

        const deletedAccount = await db.query(`SELECT * FROM bank_accounts WHERE id = ?`, [req.params.id])

        const deleteReq = await db.query(`DELETE FROM bank_accounts WHERE id = ?`, [req.params.id])

        return res.json(deletedAccount)
    } catch (error) {
        return res.json(error)
    }
}