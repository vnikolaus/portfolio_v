const socket = new WebSocket(WS_URL)

const handleSocketOpen = () => {
    console.log('WebSocket conectado.')
    socket.send(JSON.stringify({ action: ACTIONS.ADMIN }))
}

const handleSocketMessage = (event) => {
    const data = JSON.parse(event.data)

    if (data.action === ACTIONS.CLIENT_COUNT_UPDATE) {
        Util.updateClientCount(data.count)
    }
}

const handleSocketError = (error) => {
    console.error('error: ', error)
}

const handleSocketClose = () => {
    console.log('Websocket encerrado.')
}

const handlePrizeDrawClick = () => {
    const confirmationCode = Util.generateCode(12)

    if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({
            action: ACTIONS.DRAW,
            code: confirmationCode
        }))
        Util.displayConfirmationCode(confirmationCode)
    } else {
        console.warn('WebSocket está fechado. Tente novamente em instantes...')
    }

}

const drawButton = document.getElementById('draw')
const divMessage = document.getElementById('message')
drawButton.addEventListener('click', handlePrizeDrawClick)

socket.addEventListener('open', handleSocketOpen)
socket.addEventListener('message', handleSocketMessage)
socket.addEventListener('error', handleSocketError)
socket.addEventListener('close', handleSocketClose)

class Util {
    static updateClientCount = (count) => document.getElementById('clientCount').innerText = count

    static generateCode = (length) => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$&%'
        let i = 0, code = ''

        while (i < length) {
            code += chars.charAt(Math.floor(Math.random() * chars.length))
            i++
        }
        return code
    }

    static displayConfirmationCode = (code) => {
        divMessage.innerText = code
        divMessage.classList.remove('hide-message')
        divMessage.classList.add('show-message')
        drawButton.innerText = 'Sorteado !'
    }
}