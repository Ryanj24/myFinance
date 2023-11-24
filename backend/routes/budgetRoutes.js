import express from 'express'
import { getBudget, setBudget, updateBudget } from '../controllers/budgetControllers.js';
import { authorizeUser } from '../middleware/authorizeUser.js';

const router = express.Router();

router.use(authorizeUser);

router.get("/", getBudget)

router.post("/", setBudget)

router.patch("/", updateBudget)

export {router as budgetRouter}