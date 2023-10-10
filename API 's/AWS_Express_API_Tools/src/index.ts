import { toolsRepository } from './app/repositories'
import toolsRouter from './app/routes/tools.routes'

import express from 'express'
const app = express()

app.use(express.json())
app.use(toolsRouter)

const port = process.env.PORT || 3e3
app.listen(+port, async () => {
    console.log(`API running at ${port}\nhttp://localhost:${port}`);
})

export { app }
