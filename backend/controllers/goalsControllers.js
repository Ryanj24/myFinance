import { db } from "../database/database.js";
import jwt from 'jsonwebtoken'

export const getGoals = async (req, res) => {

    // Get the user id from the request headers
    const token = req.headers.authorization.split(" ")[1]
    const {id} = jwt.decode(token)

    // Get the users' goals from the db
    const goals = await db.query(`SELECT * FROM goals WHERE user_id = ?`, [id])


    // Return the array of goals
    return res.json(goals[0])
}

export const createGoal = async (req, res) => {
    
    // Get the user id from the request headers
    const token = req.headers.authorization.split(" ")[1]
    const {id} = jwt.decode(token)

    try {
        const query = await db.query(
            `INSERT INTO goals (user_id, goal_name, goal_desc, current_progress, end_goal, end_date) VALUES (?, ?, ?, ?, ?, ?)`, [id, req.body.goalName, req.body.goalDesc, req.body.currProg, req.body.endGoal, req.body.endDate]
        )

        const newGoal = await db.query(`SELECT * FROM goals WHERE user_id = ? AND goal_name = ?`, [id, req.body.goalName])

        return res.json(newGoal[0][0])
    } catch (error) {
        return res.json(error)
    }
}

export const getSingleGoal = async (req, res) => {

    // Get the goal from the db
    const goal = await db.query(`SELECT * FROM goals WHERE id = ?`, [req.params.id])


    // Return the goal
    return res.json(goal[0][0])
}


export const editGoal = async (req, res) => {

    try {
        // Update the goal in the database
        const query = await db.query(
            `UPDATE goals SET goal_name = ?, goal_desc = ?, end_goal = ?, end_date = ? WHERE id = ?`,
            [req.body.goalName, req.body.goalDesc, req.body.endGoal, req.body.endDate, req.params.id]
        )

        // Retrieve the updated goal
        const editedGoal = await db.query(`SELECT * FROM goals WHERE id = ?`, [req.params.id])

        // Return the updated goal
        return res.json(editedGoal[0][0]);

    } catch (error) {
        // Return any errors
        return res.json(error)
    }
}

export const updateGoal = async (req, res) => {

    try {
        // Update the goal in the database
        const query = await db.query(
            `UPDATE goals SET current_progress = ? WHERE id = ?`,
            [req.body.currentProgress, req.params.id]
        )

        // Retrieve the updated goal
        const updatedGoal = await db.query(`SELECT * FROM goals WHERE id = ?`, [req.params.id])

        // Return the updated goal
        return res.json(updatedGoal[0][0]);

    } catch (error) {
        // Return any errors
        return res.json(error)
    }

}

export const deleteGoal = async (req, res) => {
    
    try {

        // Before deletion, get the portfolio that is to be deleted
        const deletedGoal = await db.query(`SELECT * FROM goals WHERE id = ?`, [req.params.id])

        // Delete the portfolio
        const deleteRequest = await db.query(`DELETE FROM goals WHERE id = ?`, [req.params.id])

        // Return the deleted portfolio object
        return res.json(deletedGoal[0][0])
    } catch (error) {
        // Return any errors
        return res.json(error)
    }
}