import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { userRouter } from './routes/userRoutes.js';
import { stockRouter } from './routes/stockRoutes.js';
import { accountsRouter } from './routes/accountsRoutes.js';

const app = express();

app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api/users', userRouter);
app.use('/api/accounts', accountsRouter);
app.use('/api/portfolios', stockRouter);


app.listen(process.env.PORT_NUMBER, () => {
    console.log(`Listening for requests on port ${process.env.PORT_NUMBER}`)
})