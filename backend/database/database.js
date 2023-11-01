import mysql from 'mysql2'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config({path: path.resolve('../.env')})

export const db = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
}).promise()