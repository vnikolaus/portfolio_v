import { createHash, createCipheriv, createDecipheriv, randomBytes } from 'node:crypto'

export class Hasher {
    static hashEncrypt(data) {
        return createHash(process.env.HASH_ALGORITHM).update(data).digest('hex')
    }

    static aesEncrypt(data, key) {
        const iv = randomBytes(16)

        const cipher = createCipheriv(process.env.ALGORITHM, Buffer.from(key), iv)

        const dataEncrypted = Buffer.concat([
            cipher.update(data),
            cipher.final()
        ])

        return {
            encrypted: dataEncrypted.toString('hex'),
            iv: iv.toString('hex')
        }
    }

    static aesDecrypt(dataEncrypted, key, iv) {
        const decipher = createDecipheriv(process.env.ALGORITHM, Buffer.from(key), Buffer.from(iv, 'hex'))

        const decrypted = Buffer.concat([
            decipher.update(Buffer.from(dataEncrypted, 'hex')),
            decipher.final()
        ])

        return decrypted.toString('utf-8')
    }
}