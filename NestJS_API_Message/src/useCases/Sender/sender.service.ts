import { Injectable } from '@nestjs/common'
import { create, Whatsapp, Message, SocketState } from 'venom-bot'
import { QRCode, SendMessageProps } from './typings/types'

@Injectable()
export class SenderService {
    #client: Whatsapp
    #isConnected: boolean
    #qr: QRCode
    #attempts?: number

    constructor() {
        this.initialize()
    }

    get connection(): boolean {
        return this.#isConnected
    }

    get qr(): QRCode {
        return this.#qr
    }

    async sendMessage({ numbers, body }: SendMessageProps) {
        numbers.forEach((number) => {
            // this.#client.sendText(number, body)
            console.log(`Sending message to: ${number}\nContent: ${body}\n`)
        })
    }

    private initialize() {
        const qr = ({ base64Qr, asciiQR, attempts }: QRCode) => {
            this.#qr = { base64Qr, asciiQR, attempts }
        }

        const status = (statusSession: string) => {
            this.#isConnected = ['isLogged', 'qrReadSuccess', 'chatsAvailable'].includes(statusSession)
                ? (this.#isConnected = true)
                : (this.#isConnected = false)
        }

        const start = (client: Whatsapp) => {
            this.#client = client

            // client.onStateChange((state) => {
            //     this.#isConnected = state === SocketState.CONNECTED
            // })
        }

        qr({ base64Qr: 'QR-Teste', asciiQR: 'QR-Teste', attempts: 1 })
        status('qrReadSuccess')
        start(this.#client)

        // Criação do serviço
        // create(`sender-one`, qr, status)
        //     .then((client) => start(client))
        //     .catch((err) => {
        //         console.log(err)
        //     })
    }
}

export default SenderService
