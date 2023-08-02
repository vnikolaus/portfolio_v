import { config } from 'dotenv'
config()

export const ID_PRODUCT = +process.env.JEST_ID
export const NAME = process.env.CELL_NAME
export const CODE = process.env.CELL_FIXEDTYPE
export const PRICE = 99
export const STORAGE = 99
