import express from 'express'
import { loginUser, registerUser, updateUser } from '../controllers/userControllers.js';
import { authorizeUser } from '../middleware/authorizeUser.js'

const router = express.Router();

router.post("/login", loginUser)

router.post("/register", registerUser)

router.use(authorizeUser)

router.patch("/update", updateUser)


export {router as userRouter}