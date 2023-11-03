import {db} from '../database/database.js'
import jwt from 'jsonwebtoken'

export const getPortfolios = async (req, res) => {

    const token = req.headers.authorization.split(" ")[1]
    const user = jwt.decode(token)

    const portfolios = await db.query(`SELECT portfolio_name, balance FROM stock_portfolio WHERE portfolio_owner_id = ?`, [user.id])

    return res.json(portfolios[0])
}

export const createPortfolio = async (req, res) => {
    
    const token = req.headers.authorization.split(" ")[1]
    const user = jwt.decode(token)

    try {
        const query = await db.query(
            `INSERT INTO stock_portfolio (portfolio_name, portfolio_owner_id)
             VALUES (?, ?)
            `, [req.body.portfolioName, user.id]
        )

        const createdPortfolio = await db.query(`SELECT * FROM stock_portfolio WHERE portfolio_name = ?`, [req.body.portfolioName])

        return res.json(createdPortfolio[0][0]);
        
    } catch (error) {
        return res.json(error)
    }
}

export const getSinglePortoflio = async (req, res) => {
    
    const portfolio = await db.query(`SELECT portfolio_name, balance FROM stock_portfolio WHERE id = ?`, [req.params.id])
    const portfolioTransactions = await db.query(
        `SELECT company_name, company_ticker, type, transaction_date, quantity, price_per_share, total_amount FROM stock_transactions WHERE portfolio_id = ?`,
        [req.params.id]
    )

    if (!portfolio[0][0]) {
        return res.json({error: true, message: `No portfolio exists with the id ${req.params.id}`})
    }

    return res.json({portfolio: portfolio[0][0], transactions: portfolioTransactions[0]})
}

export const stockTransaction = async (req, res) => {
    
    const token = req.headers.authorization.split(" ")[1]
    const {id} = jwt.decode(token)

    let dateOfTransaction = new Date();
    dateOfTransaction = dateOfTransaction.toISOString().split("T")[0];

    try {
        const query = await db.query(
            `CALL stock_transaction_procedure(?, ?, ?, ?, ?, ?, ?)`, 
            [req.params.id, req.body.companyName, req.body.companyTicker, req.body.transactionType, dateOfTransaction, req.body.shareQuantity, req.body.sharePrice]
        )

        const transaction = await db.query(`SELECT company_name, company_ticker, type, transaction_date, quantity, price_per_share, total_amount FROM stock_transactions WHERE portfolio_id = ? ORDER BY id DESC LIMIT 1`, [req.params.id])

        return res.json(transaction[0][0]);

    } catch (error) {
        return res.json(error);
    }
    
}

export const updatePortfolio = async (req, res) => {

    const token = req.headers.authorization.split(" ")[1]
    const user = jwt.decode(token)
    
    try {
        const update = await db.query(
            `UPDATE stock_portfolio SET portfolio_name = ? WHERE id = ? AND portfolio_owner_id = ?`,
            [req.body.accountName, req.params.id, user.id]
        )

        const updatedPortfolio = await db.query(`SELECT * FROM stock_portfolio WHERE id = ?`, [req.params.id])

        return res.json(updatedPortfolio[0][0]);

    } catch (error) {
        return res.json(error)
    }
}

export const deletePortfolio = async (req, res) => {
    
    try {

        const deletedPortfolio = await db.query(`SELECT * FROM stock_portfolio WHERE id = ?`, [req.params.id])

        const deleteReq = await db.query(`DELETE FROM stock_portfolio WHERE id = ?`, [req.params.id])

        return res.json(deletedPortfolio[0][0])
    } catch (error) {
        return res.json(error)
    }
}