import express from 'express'
import { 
    getUserAccounts, 
    createNewAccount,
    createTransaction,
    updateAccount,
    deleteAccount,
    updateTransaction,
    deleteTransaction,
    transferAccountFunds 
} from '../controllers/accountsControllers.js';
import { authorizeUser } from '../middleware/authorizeUser.js';

const router = express.Router();

router.use(authorizeUser);

router.get("/", getUserAccounts)

router.post("/", createNewAccount)

router.post("/:id", createTransaction)

router.patch("/:id", updateAccount)

router.delete("/:id", deleteAccount)

router.post("/:id/transfer", transferAccountFunds)

router.patch("/:id/transaction/:transactionID", updateTransaction)

router.delete("/:id/transaction/:transactionID", deleteTransaction)

export {router as accountsRouter}