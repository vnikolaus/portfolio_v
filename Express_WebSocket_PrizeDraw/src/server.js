const express = require('express')
const http = require('node:http')
const WebSocket = require('ws')
const { Handler } = require('./handler/Handler.js')
const { router } = require('./routes.js')

const app = express()
const server = http.createServer(app)
const wss = new WebSocket.Server({ server })

app.use(router)

const PORT = process.env.PORT  || 3000
server.listen(+PORT, () => {
    console.log(`Server running at ${PORT}`);
})

wss.on('connection', (ws) => {
    Handler.setClient(ws)

    ws.on('message', msg => {
        Handler.handleMessage(ws, msg)
        Handler.updateClientCount()
    })
    
    ws.on('close', () => {
        Handler.updateClients(ws)
        Handler.updateClientCount()
    })
})

