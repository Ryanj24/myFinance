import express from 'express'
import {getPortfolios, createPortfolio, stockTransaction, updatePortfolio, deletePortfolio, companyDataFetch, priceLookup} from '../controllers/stockControllers.js'
import { authorizeUser } from '../middleware/authorizeUser.js';

const router = express.Router();

router.use(authorizeUser);

router.get("/", getPortfolios)

router.post("/", createPortfolio)

router.post("/:id", stockTransaction)

router.patch("/:id", updatePortfolio)

router.delete("/:id", deletePortfolio)

router.post("/companySearch/:ticker", companyDataFetch)

router.post("/companyPrice/:ticker", priceLookup)

export {router as stockRouter}