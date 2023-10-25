import mysql from 'mysql2'
import dotenv from 'dotenv'

dotenv.config({path: '../.env'});

const db = mysql.createPool({
    connectionLimit: 10,
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DB
}).promise()

export const getUsers = async () => {

    const result = await db.query(`SELECT * FROM users`)

    return result[0]
}