import express from 'express'
const app = express()

import { handler } from './handler.mjs'

app.get('/hash/:data', handler('hash'))
app.get('/aes/:data', handler('aes'))

const PORT = process.env.API_PORT || 3000
app.listen(+PORT, () => {
    console.log(`API running at ${PORT}\nhttp://localhost:${PORT}`);
})

export { app }