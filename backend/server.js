import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { userRouter } from './routes/userRoutes.js';
import { stockRouter } from './routes/stockRoutes.js';
import { accountsRouter } from './routes/accountsRoutes.js';
import { goalRouter } from './routes/goalRoutes.js';
import { budgetRouter } from './routes/budgetRoutes.js';

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api/users', userRouter);
app.use('/api/accounts', accountsRouter);
app.use('/api/portfolios', stockRouter);
app.use('/api/goals', goalRouter);
app.use('/api/budgets', budgetRouter);


app.listen(process.env.PORT_NUMBER, () => {
    console.log(`Listening for requests on port ${process.env.PORT_NUMBER}`)
})