import express from 'express'
const app = express()
import { router } from './routes'

import dotenv from 'dotenv'
dotenv.config()

app.use(express.json())
app.use(router)

export { app }