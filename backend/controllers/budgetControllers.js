import { db } from '../database/database.js'
import jwt from 'jsonwebtoken'

export const getBudget = async (req, res) => {

    // Get the user id from the request headers
    const token = req.headers.authorization.split(" ")[1]
    const {id} = jwt.decode(token)

    // Select the users' monthly budgets
    const budget = await db.query(`SELECT * FROM monthly_budgets WHERE user_id = ?`, [id])

    // Return the array of budgets
    return res.json(budget[0]);
}

export const setBudget = async (req, res) => {
    
    // Get the user id from the request headers
    const token = req.headers.authorization.split(" ")[1]
    const {id} = jwt.decode(token)

    try {

        // Insert the budget data into the monthly_budgets table
        const query = await db.query(
            `INSERT INTO monthly_budgets (user_id, month, year, total_budget, housing, transportation, food, utilities, medical_healthcare, personal, entertainment, other)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
             [id, req.body.month, req.body.year, req.body.totalBudget, req.body.housing, req.body.transportation, req.body.food, req.body.utils, req.body.health, req.body.personal, req.body.entertainment, req.body.other]
        )

        // Retrieve the newly inserted budget
        const insertedBudget = await db.query(`SELECT * FROM monthly_budgets WHERE month = ? AND year = ? AND user_id = ?`, [req.body.month, req.body.year, id])

        // Return the budget object
        return res.json(insertedBudget[0][0])
    } catch (error) {

        // Return any error
        return res.json(error)
    }
}

export const updateBudget = async (req, res) => {

    // Get the user id from the request headers
    const token = req.headers.authorization.split(" ")[1]
    const {id} = jwt.decode(token)

    try {

        // Update the specified budget in the database with the data provided in the request body
        const query = await db.query(
            `UPDATE monthly_budgets 
             SET total_budget = ?, housing = ?, transportation = ?, food = ?, utilities = ?, medical_healthcare = ?, personal = ?, entertainment = ?, other = ?
             WHERE month = ? AND year = ? AND user_id = ?`,
             [req.body.totalBudget, req.body.housing, req.body.transportation, req.body.food, req.body.utils, req.body.health, req.body.personal, req.body.entertainment, req.body.other, req.body.month, req.body.year, id]
        )

        // Retrieve the updated budget
        const updatedBudget = await db.query(`SELECT * FROM monthly_budgets WHERE month = ? AND year = ? AND user_id = ?`, [req.body.month, req.body.year, id])


        // Return the updated budget object
        return res.json(updatedBudget[0][0])
    } catch (error) {

        // Return any error
        return res.json(error)
    }
}