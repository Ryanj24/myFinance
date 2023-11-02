import express from 'express'
import { getUserAccounts, createNewAccount, getSingleAccount, updateAccount, deleteAccount } from '../controllers/accountsControllers.js';

const router = express.Router();

router.get("/", getUserAccounts)

router.post("/", createNewAccount)

router.get("/:id", getSingleAccount)

router.patch("/:id", updateAccount)

router.delete("/:id", deleteAccount)

export {router as accountsRouter}