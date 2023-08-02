import { config } from 'dotenv'
config()

export const ID_SOLICITANTE = +process.env.JEST_ID
export const SOLICITANTE = process.env.JEST_LOGIN
