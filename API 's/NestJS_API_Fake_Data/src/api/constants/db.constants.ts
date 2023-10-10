import { config } from 'dotenv'
config()

export const HOST = process.env.MYSQL_HOST
export const USER = process.env.MYSQL_USER
export const PWD = process.env.MYSQL_PWD
export const DATABASE = process.env.MYSQL_DATABASE
