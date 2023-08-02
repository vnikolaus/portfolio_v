import { config } from 'dotenv'
config()

export const ID = +process.env.JEST_ID
export const NAME = process.env.JEST_NAME
export const LOGIN = process.env.JEST_LOGIN
export const PWD = process.env.JEST_PWD
