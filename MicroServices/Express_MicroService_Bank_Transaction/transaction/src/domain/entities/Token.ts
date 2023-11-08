import jwt from 'jsonwebtoken'
import { randomBytes } from 'node:crypto'

export class Token {
    private content: string

    constructor(pwd: string) {
        const randKey = randomBytes(6).toString('hex')
        const payload = {
            pwd,
            date: +new Date(),
            key: randKey,
        }

        const jwtToken = jwt.sign(Buffer.from(JSON.stringify(payload)), process.env.VITE_JWT_KEY)
        this.content = jwtToken
    }
}
