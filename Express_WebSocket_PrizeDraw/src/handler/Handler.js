const WebSocket = require('ws')

const ACTIONS = {
    ADMIN: 'admin',
    DRAW: 'draw',
    CLIENT_COUNT_UPDATE: 'clientCountUpdate'
}

class Handler {
    static clients = []

    static setClient = (ws) => {
        this.clients.push(ws)
    }

    static updateClients = (ws) => {
        this.clients = this.clients.filter(client => client !== ws)
    }

    static handleMessage = (webSocket, msg) => {
        const data = JSON.parse(msg)
        const action = data.action
    
        switch(action) {
            case ACTIONS.ADMIN :
                webSocket.isAdmin = true
                break;
            case ACTIONS.DRAW :
                Handler.handlePrizeDraw(data.code)
                break;
            default :
                console.warn('Unknown action: ', action);
        }     
    }

    static handlePrizeDraw = (confirmationCode) => {
        const participants = this.clients.filter(client => !client.isAdmin)
        const winner = participants.at(Math.floor(Math.random() * participants.length))
    
        participants.forEach(participant => {
            let result = JSON.stringify({ status: 'Lose' })
            if (participant === winner) result = JSON.stringify({ status: 'WIN', code: confirmationCode })
            participant.send(result)
        })
    }

    static updateClientCount = () => {
        const clientsCount = this.clients.filter(client => !client.isAdmin).length
    
        this.clients.forEach(client => {
            if (client.isAdmin && client.readyState === WebSocket.OPEN) {
                client.send(
                    JSON.stringify({ 
                        action: ACTIONS.CLIENT_COUNT_UPDATE,
                        count: clientsCount
                    })
                )
            }
        })
    }
}

module.exports =  { Handler }