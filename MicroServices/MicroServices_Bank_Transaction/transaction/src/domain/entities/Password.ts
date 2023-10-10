import { createHash } from 'node:crypto'

export class Password {
    constructor(private content: string) {
        const hashPassword = createHash(process.env.VITE_HASH_ALGORITHM).update(content).digest('hex')
        this.content = hashPassword
    }
}
