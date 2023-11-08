import { Injectable, UnauthorizedException } from '@nestjs/common'
import { DatabaseService } from '../database/database.service'

@Injectable()
export class StockRepository {
    constructor(private readonly db: DatabaseService) {}

    async findByCode(code: string) {
        try {
            const conn = await this.db.connect()
            const data = await conn.query('SELECT * FROM "public"."stock" WHERE itemcode = $1', code)
            conn.done(true)
            return data
        } catch (err) {
            throw new UnauthorizedException(err.message)
        } finally {
            await this.db.disconnect()
        }
    }

    async updateStock(code: string, qty: number) {
        try {
            const conn = await this.db.connect()
            await conn.query('UPDATE "public"."stock" SET quantity = $1, updatedAt = $2 WHERE itemcode = $3', [qty, new Date(), code])
            conn.done(true)
        } catch (err) {
            throw new UnauthorizedException(err.message)
        } finally {
            await this.db.disconnect()
        }
    }
}
