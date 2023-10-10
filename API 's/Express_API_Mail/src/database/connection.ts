import { createConnection } from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()

const conn = createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PWD,
    database: process.env.MYSQL_DATABASE
}).promise()

export { conn }