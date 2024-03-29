import {db} from '../database/database.js'
import jwt from 'jsonwebtoken'
import { fetchCompanyData, companyPriceLookup } from '../utilityFunctions/fetchCompanyData.js'

export const getPortfolios = async (req, res) => {

    // Get the user object from the request headers
    const token = req.headers.authorization.split(" ")[1]
    const user = jwt.decode(token)

    // Get the names, balances & providers of the users' stock portfolios
    const portfolios = await db.query(`SELECT id, portfolio_name, balance, provider FROM stock_portfolio WHERE portfolio_owner_id = ?`, [user.id])

    // Get the stock transactions for the users' portfolios
    const portfolioTransactions = await db.query(`SELECT * FROM stock_transactions WHERE portfolio_id IN (SELECT id FROM stock_portfolio WHERE portfolio_owner_id = ?)`, [user.id])

    // Retrieve the users' stock holdings
    const holdings = await db.query(`SELECT * FROM stock_holdings WHERE portfolio_id IN (SELECT id FROM stock_portfolio WHERE portfolio_owner_id = ?)`, [user.id])

    // Return the arrays of portfolios, stock transactions and holdings
    return res.json({stockPortfolios: portfolios[0], stockTransactions: portfolioTransactions[0], holdings: holdings[0]})
}

export const createPortfolio = async (req, res) => {
    
    // Get the user object from the request headers
    const token = req.headers.authorization.split(" ")[1]
    const {id} = jwt.decode(token)

    try {
        // Insert the new portfolio into the database
        const query = await db.query(
            `INSERT INTO stock_portfolio (portfolio_name, portfolio_owner_id, balance, provider)
             VALUES (?, ?, ?, ?)
            `, [req.body.portfolio_name, id, req.body.portfolio_balance, req.body.portfolio_provider]
        )

        // Retrieve the newly created portfolio from the database
        const createdPortfolio = await db.query(`SELECT * FROM stock_portfolio WHERE portfolio_owner_id = ? ORDER BY id DESC LIMIT 1`, [id])

        // Return the portfolio object
        return res.json(createdPortfolio[0][0]);
        
    } catch (error) {
        // Return any error
        return res.json(error)
    }
}


export const stockTransaction = async (req, res) => {
    
    // Get the date of the transaction (current date) in the format yyyy-mm-dd
    let dateOfTransaction = new Date();
    dateOfTransaction = dateOfTransaction.toISOString().split("T")[0];

    try {
        // Call the stock_transaction_procedure and provide the relevant parameters
        const query = await db.query(
            `CALL stock_transaction_procedure(?, ?, ?, ?, ?, ?, ?, ?)`, 
            [req.params.id, req.body.companyName, req.body.companyTicker, req.body.transactionType, dateOfTransaction, req.body.shareQuantity, req.body.logoSrc, req.body.sharePrice]
        )

        // Get the users' total holding of the company in which they have just purchased shares 
        const holding = await db.query(`SELECT * FROM stock_holdings WHERE portfolio_id = ? AND company_name = ?`, [req.params.id, req.body.companyName])
        
        // Select the transaction from the database
        const transaction = await db.query(`SELECT portfolio_id, company_name, company_ticker, type, transaction_date, quantity, price_per_share, total_amount FROM stock_transactions WHERE portfolio_id = ? ORDER BY id DESC LIMIT 1`, [req.params.id])

        // Return the users' holding in the company & the transaction
        return res.json({holding: holding[0][0], transaction: transaction[0][0]});

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
        // Update the details of the portfolio in the database
        const update = await db.query(
            `UPDATE stock_portfolio SET portfolio_name = ?, balance = ?, provider = ? WHERE id = ? AND portfolio_owner_id = ?`,
            [req.body.portfolio_name, req.body.portfolio_balance, req.body.portfolio_provider, req.params.id, id]
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

export const companyDataFetch = async (req, res) => {

    // Fetch the data of the company for which the user has searched for
    const response = await fetchCompanyData(req.body.companyTicker)

    // Return the data
    return res.json(response)
}

export const priceLookup = async (req, res) => {

    // Get the current price of the company searched for by the user
    const response = await companyPriceLookup(req.body.companyTicker)

    // Return the data
    return res.json(response)
}