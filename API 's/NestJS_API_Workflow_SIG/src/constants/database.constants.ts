import { config } from 'dotenv'
config()

export const HOST = process.env.DB_HOST
export const PORT = +process.env.DB_PORT
export const USERNAME = process.env.DB_USER
export const PASSWORD = process.env.DB_PWD
export const DATABASE = process.env.DB_DATABASE
