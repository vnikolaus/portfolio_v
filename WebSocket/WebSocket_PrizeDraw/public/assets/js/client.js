const socket = new WebSocket(WS_URL)

const body = document.querySelector('body')
const logo = document.getElementById('logo')
const divMessage = document.getElementById('message')

const handleServerMessage = (event) => {
    const data = JSON.parse(event.data)

    switch(data.status) {
        case STATUS.WIN :
            setClientState('win', data.code)
            break;

        case STATUS.LOSE :
            setClientState('lose', data.code)
            break;
    }
}

const setClientState = (state, code) => {
    body.className = 'main'
    divMessage.classList.toggle('hide-message', true)
    logo.classList.toggle('stop-spin', false)
    logo.classList.toggle('spin-animation', true)

    setTimeout(() => {
        if (state === 'win') {
            body.classList.add('win')
            divMessage.innerText = code
        } else if (state === 'lose') {
            body.classList.add('lose')
            divMessage.innerText = ''
        }

        divMessage.classList.toggle('show-message', state === 'win')
        divMessage.classList.toggle('hide-message', state !== 'win')
        logo.classList.toggle('spin-animation', false)
        logo.classList.toggle('stop-spin', true)
    }, 6250)
}

socket.addEventListener('message', handleServerMessage)