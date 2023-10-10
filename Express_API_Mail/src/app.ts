import express from 'express'
const app = express()
import { router } from './routes'
import autentication from './src/middlewares/autentication'

import dotenv from 'dotenv'
dotenv.config()

app.use(express.json())
app.use(router)
app.use(autentication)

export { app }