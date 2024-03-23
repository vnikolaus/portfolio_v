import { randomUUID as uuid } from 'crypto'
import { writeFile, readFile, access, constants } from 'fs/promises'
import { join } from 'path'

type IKey = {
    key: string
}

export class Key {
    #keys: Map<string, IKey> = new Map()
    #path = join('src', 'auth', 'keys', '.keys.json')

    async findKey({ key }: IKey): Promise<[string, IKey]> {
        await this.init()
        const arr = [...this.#keys]
        const find = arr.find((data) => data[1].key === key)

        return find
    }

    async generateKey(): Promise<IKey['key']> {
        const chars = 'abcdefghijklgmnopqrstuvwxyz0123456789'
        const arrayChars = chars.split(/(?=)/g)
        const key = arrayChars
            .sort(() => {
                return 0.5 - Math.random()
            })
            .join('')
            .toUpperCase()

        return key
    }

    async addKey({ key }: IKey): Promise<IKey['key']> {
        const id = uuid()
        this.#keys.set(id, { key })

        await this.saveKey()

        console.log(`New KEY generated: ${key}`)
        return key
    }

    async saveKey(): Promise<void> {
        return writeFile(
            this.#path,
            JSON.stringify({
                keys: [...this.#keys.entries()],
            })
        )
    }

    async #load(): Promise<void> {
        const data = await readFile(this.#path, 'utf-8')
        this.#keys = new Map(Array.isArray(JSON.parse(data).keys) ? JSON.parse(data).keys : new Map())
    }

    async init(): Promise<void> {
        try {
            await access(this.#path, constants.F_OK)
            await this.#load()
        } catch (err) {
            await this.saveKey()
        }
    }
}

const KEY_INSTANCE = new Key()

export { KEY_INSTANCE }
