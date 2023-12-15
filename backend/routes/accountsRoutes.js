import express from 'express'
import { getUserAccounts, createNewAccount, createTransaction, updateAccount, deleteAccount, updateTransaction } from '../controllers/accountsControllers.js';
import { authorizeUser } from '../middleware/authorizeUser.js';

const router = express.Router();

router.use(authorizeUser);

router.get("/", getUserAccounts)

router.post("/", createNewAccount)

router.post("/:id", createTransaction)

router.patch("/:id", updateAccount)

router.delete("/:id", deleteAccount)

router.patch("/:id/transaction/:transactionID", updateTransaction)

export {router as accountsRouter}