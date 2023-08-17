export interface RoomUser {
    socketId: string
    user: string
    room: string
}

export interface Message {
    room: string
    content: string
    user: string
    createdAt: Date
}

export interface UserMessage {
    user: string
    room: string
    message: string
}
