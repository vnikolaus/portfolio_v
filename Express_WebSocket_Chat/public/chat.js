const backToIndex = () => {
    window.location.href = 'index.html'
}

const showHtmlMessage = (message) => {
    const div = document.querySelector('.messages')
    const date = String(message.createdAt).slice(0, 10)

    div.innerHTML += `
    <div class="messages" id="messages">
        <div class="new_message">
          <label for="form-label">
            <strong>${message.user}</strong>
            <span>${message.content} - ${date}</span>
          </label>
        </div>
      </div>
    `
}

const clearMessages = () => {
    socket.emit('clear_messages')

    const messages = document.querySelectorAll('.messages')
    for (const message of messages) {
        const className = String(message.className)
        if (className.includes('notExcluded')) continue

        message.remove()
    }
}

const socket = io()

const urlParams = new URLSearchParams(window.location.search)
const user = urlParams.get('username')
const room = urlParams.get('select_room')

const helloDiv = document.getElementById('username')
helloDiv.innerHTML = `
  <div class="messages notExcluded">
    <label for="form-label">
      <span>CHAT: Olá ${user} - Você está na sala ${room}.</span>
    </label>
  </div>
`

socket.emit(
  'selected_room', 
  { user, room }, 
  (response) => response.forEach((message) => showHtmlMessage(message))
)

document.getElementById('message_input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const message = e.target.value

        socket.emit('new_message', {
            user,
            room,
            message,
        })

        e.target.value = ''
    }
})

socket.on('new_message', (message) => {
    showHtmlMessage(message)
})
