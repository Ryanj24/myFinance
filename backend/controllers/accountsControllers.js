import { db } from "../database/database.js"
import jwt from 'jsonwebtoken'

export const getUserAccounts = async (req, res) => {

    const token = req.headers.authorization.split(" ")[1]
    const user = jwt.decode(token)

    const accounts = await db.query(`SELECT account_name, account_number, balance FROM bank_accounts WHERE id = ?`, [user.id])

    return res.json(accounts[0])
}

export const createNewAccount = async (req, res) => {

    const token = req.headers.authorization.split(" ")[1]
    const {id} = jwt.decode(token)

    try {
        const account = await db.query(
            `INSERT INTO bank_accounts (account_name, account_number, account_owner_id)
             VALUES (?, ?, ?)
            `, [req.body.accountName, req.body.accountNumber, id]
        )

        return res.json(account)
        
    } catch (error) {
        return res.json(error)
    }
    
}

export const getSingleAccount = async (req, res) => {
    
}

export const updateAccount = async (req, res) => {
    
}

export const deleteAccount = async (req, res) => {
    
}