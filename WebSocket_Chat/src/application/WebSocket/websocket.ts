import { io } from '../../http'
import { Message, RoomUser, UserMessage } from './typings/interfaces'

const users: RoomUser[] = []
const messages: Message[] = []

io.on('connection', (socket) => {
    socket.on('selected_room', ({ socketId, room, user }: RoomUser, cb: CallableFunction): void => {
        socket.join(room)

        const userInRoom = users.find((el) => el.user === user && el.room === room)

        userInRoom
            ? (userInRoom.socketId = socketId)
            : users.push({
                  socketId,
                  user,
                  room,
              })

        const roomMessage = getRoomMessages(room)
        cb(roomMessage)
    })

    socket.on('new_message', ({ user, room, message: content }: UserMessage): void => {
        const msg: Message = {
            room,
            content,
            user,
            createdAt: new Date(),
        }

        messages.push(msg)

        io.to(room).emit('new_message', msg)
    })

    socket.on('clear_messages', (): void => {
        messages.splice(0, messages.length)
    })
})

const getRoomMessages = (room: string): Message[] => messages.filter((message: Message) => message.room === room)
