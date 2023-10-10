export interface IAdress {
    email: string
    name: string
}

export interface IMessage {
    to: IAdress
    from: IAdress
    subject: string
    content: string
}


export interface IMailService {
    sendMail(message: IMessage): Promise<void>
}