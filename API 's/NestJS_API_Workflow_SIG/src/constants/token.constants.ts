import { config } from 'dotenv'
config()

export const SECRET = process.env.SECRET
export const EXPIRATION = process.env.EXPIRATION
export const SALT = +process.env.SALT
