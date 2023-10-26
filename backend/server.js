import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { getUsers } from './database/database.js'

const app = express();

app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get("/", async (req, res) => {

    const users = await getUsers();
    res.send(users);
})


app.listen("3000", () => {
    console.log("Listening for requests")
})