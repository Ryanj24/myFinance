import express from 'express'
import {getPortfolios, createPortfolio, getSinglePortoflio, stockTransaction, updatePortfolio, deletePortfolio, companyDataFetch} from '../controllers/stockControllers.js'
import { authorizeUser } from '../middleware/authorizeUser.js';

const router = express.Router();

router.use(authorizeUser);

router.get("/", getPortfolios)

router.post("/", createPortfolio)

router.get("/:id", getSinglePortoflio)

router.post("/:id", stockTransaction)

router.patch("/:id", updatePortfolio)

router.delete("/:id", deletePortfolio)

router.get("/companySearch/:ticker", companyDataFetch)

export {router as stockRouter}