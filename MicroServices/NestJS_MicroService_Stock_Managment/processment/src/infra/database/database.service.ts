import { Injectable } from '@nestjs/common'
import * as pgp from 'pg-promise'
import { config as dotenv } from 'dotenv'
dotenv()

@Injectable()
export class DatabaseService {
    #db = pgp()(process.env.DATABASE_URL)

    async connect() {
        return await this.#db.connect()
    }

    async disconnect() {
        await this.#db.$pool.end
    }
}
