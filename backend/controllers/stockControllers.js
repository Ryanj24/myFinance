import {db} from '../database/database.js'
import jwt from 'jsonwebtoken'

export const getPortfolios = async (req, res) => {

    // Get the user object from the request headers
    const token = req.headers.authorization.split(" ")[1]
    const user = jwt.decode(token)

    // Get the names and balances of the users' stock portfolios
    const portfolios = await db.query(`SELECT id, portfolio_name, balance FROM stock_portfolio WHERE portfolio_owner_id = ?`, [user.id])

    const portfolioTransactions = await db.query(`SELECT portfolio_id, company_name, company_ticker, type, transaction_date, quantity, price_per_share, total_amount FROM stock_transactions WHERE portfolio_id IN (SELECT id FROM stock_portfolio WHERE portfolio_owner_id = ?)`, [user.id])

    // Return the array of portfolios
    return res.json({stockPortfolios: portfolios[0], stockTransactions: portfolioTransactions[0]})
}

export const createPortfolio = async (req, res) => {
    
    // Get the user object from the request headers
    const token = req.headers.authorization.split(" ")[1]
    const {id} = jwt.decode(token)

    try {
        // Insert the new portfolio into the database
        const query = await db.query(
            `INSERT INTO stock_portfolio (portfolio_name, portfolio_owner_id)
             VALUES (?, ?)
            `, [req.body.portfolioName, id]
        )

        // Retrieve the newly created portfolio from the database
        const createdPortfolio = await db.query(`SELECT * FROM stock_portfolio WHERE portfolio_name = ?`, [req.body.portfolioName])

        // Return the portfolio object
        return res.json(createdPortfolio[0][0]);
        
    } catch (error) {
        // Return any error
        return res.json(error)
    }
}

export const getSinglePortoflio = async (req, res) => {
    
    // Get the name and balance of the portfolio along with all transactions related to that portfolio
    const portfolio = await db.query(`SELECT portfolio_name, balance FROM stock_portfolio WHERE id = ?`, [req.params.id])
    const portfolioTransactions = await db.query(
        `SELECT company_name, company_ticker, type, transaction_date, quantity, price_per_share, total_amount FROM stock_transactions WHERE portfolio_id = ?`,
        [req.params.id]
    )

    // If no portfolio is returned then alert the user that no portfolio exists with the id provided
    if (!portfolio[0][0]) {
        return res.json({error: true, message: `No portfolio exists with the id ${req.params.id}`})
    }

    // Return the portfolio and all transactions
    return res.json({portfolio: portfolio[0][0], transactions: portfolioTransactions[0]})
}

export const stockTransaction = async (req, res) => {
    
    // Get the date of the transaction in the format yyyy-mm-dd
    let dateOfTransaction = new Date();
    dateOfTransaction = dateOfTransaction.toISOString().split("T")[0];

    try {
        // Call the stock_transaction_procedure and provide the relevant parameters
        const query = await db.query(
            `CALL stock_transaction_procedure(?, ?, ?, ?, ?, ?, ?)`, 
            [req.params.id, req.body.companyName, req.body.companyTicker, req.body.transactionType, dateOfTransaction, req.body.shareQuantity, req.body.sharePrice]
        )

        // Select the transaction from the database
        const transaction = await db.query(`SELECT company_name, company_ticker, type, transaction_date, quantity, price_per_share, total_amount FROM stock_transactions WHERE portfolio_id = ? ORDER BY id DESC LIMIT 1`, [req.params.id])

        // Return the transaction
        return res.json(transaction[0][0]);

    } catch (error) {
        // Return any errors
        return res.json(error);
    }
    
}

export const updatePortfolio = async (req, res) => {

    // Get the user object from the request headers
    const token = req.headers.authorization.split(" ")[1]
    const {id} = jwt.decode(token)
    
    try {
        // Update the name of the portfolio in the database
        const update = await db.query(
            `UPDATE stock_portfolio SET portfolio_name = ? WHERE id = ? AND portfolio_owner_id = ?`,
            [req.body.accountName, req.params.id, id]
        )

        // Retrieve the updated portfolio
        const updatedPortfolio = await db.query(`SELECT * FROM stock_portfolio WHERE id = ?`, [req.params.id])

        // Return the updated portfolio
        return res.json(updatedPortfolio[0][0]);

    } catch (error) {
        // Return any errors
        return res.json(error)
    }
}

export const deletePortfolio = async (req, res) => {
    
    try {

        // Before deletion, get the portfolio that is to be deleted
        const deletedPortfolio = await db.query(`SELECT * FROM stock_portfolio WHERE id = ?`, [req.params.id])

        // Delete the portfolio
        const deleteReq = await db.query(`DELETE FROM stock_portfolio WHERE id = ?`, [req.params.id])

        // Return the deleted portfolio object
        return res.json(deletedPortfolio[0][0])
    } catch (error) {
        // Return any errors
        return res.json(error)
    }
}