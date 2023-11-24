import express from 'express'
import { getGoals, createGoal, getSingleGoal, updateGoal, deleteGoal } from '../controllers/goalsControllers.js';
import { authorizeUser } from '../middleware/authorizeUser.js';

const router = express.Router();

router.use(authorizeUser);

router.get("/", getGoals)

router.post("/", createGoal)

router.get("/:id", getSingleGoal)

router.patch("/:id", updateGoal)

router.delete("/:id", deleteGoal)

export {router as goalRouter}