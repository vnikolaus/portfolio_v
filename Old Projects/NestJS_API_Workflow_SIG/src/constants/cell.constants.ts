import { config } from 'dotenv'
config()

export const CELL_ID = +process.env.CELL_ID
export const CELL_NAME = process.env.CELL_NAME
export const CELL_FIXEDTYPE = process.env.CELL_FIXEDTYPE
