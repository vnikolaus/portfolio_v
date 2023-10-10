export type SendMessageProps = {
    numbers: string[]
    body: string
}

export type QRCode = {
    base64Qr: string
    asciiQR: string
    attempts: number
}
