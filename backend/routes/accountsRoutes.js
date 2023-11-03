import express from 'express'
import { getUserAccounts, createNewAccount, getSingleAccount, depositFunds, updateAccount, deleteAccount } from '../controllers/accountsControllers.js';

const router = express.Router();

router.get("/", getUserAccounts)

router.post("/", createNewAccount)

router.get("/:id", getSingleAccount)

router.post("/:id", depositFunds)

router.patch("/:id", updateAccount)

router.delete("/:id", deleteAccount)

export {router as accountsRouter}