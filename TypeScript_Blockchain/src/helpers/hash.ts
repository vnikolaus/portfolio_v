import { BinaryLike, createHash } from 'crypto'
import { ValidHash } from '../Blockchain/typings/types'

export function hash(data: BinaryLike): string {
    return createHash('sha256').update(JSON.stringify(data)).digest('hex')
}

export function validatedHash({ hash, difficulty = 4, prefix = '0' }: ValidHash) {
    const check = prefix.repeat(difficulty)
    return hash.startsWith(check)
}
