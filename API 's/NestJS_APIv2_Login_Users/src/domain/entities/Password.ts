import * as bcrypt from 'bcrypt'
import { config as dotenv } from 'dotenv'
dotenv()

export class Password {
    readonly #salt = bcrypt.genSaltSync(+process.env.PWD_SALT)

    constructor(readonly content: string) {
        const hashedPassword = bcrypt.hashSync(content, this.#salt)
        this.content = hashedPassword
    }
}
