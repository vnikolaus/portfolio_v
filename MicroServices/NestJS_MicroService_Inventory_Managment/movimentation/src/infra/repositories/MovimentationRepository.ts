import { Injectable, UnauthorizedException } from '@nestjs/common'
import { Movimentation } from '../../domain/Movimentation'
import { DatabaseService } from '../database/database.service'
import { config as dotenv } from 'dotenv'
dotenv()

@Injectable()
export class MovimentationRepository {
    constructor(readonly db: DatabaseService) {}

    async insert(movimentation: Movimentation) {
        try {
            const conn = await this.db.connect()
            const persistencyData = {
                ...movimentation,
                item: movimentation.item.code,
            }
            await conn.query(
                'INSERT INTO "public"."movimentation" (id, item, quantity, createdAt, updatedAt, status) VALUES ($1, $2, $3, $4, $5, $6)',
                [...Object.values(persistencyData)],
            )
            conn.done(true)
        } catch (err) {
            throw new UnauthorizedException(err.message)
        } finally {
            await this.db.disconnect()
        }
    }

    async find(id: string) {
        try {
            const conn = await this.db.connect()
            const data = await conn.query('SELECT * FROM "public"."movimentation" WHERE id = $1', id)
            conn.done(true)
            return data
        } catch (err) {
            throw new UnauthorizedException(err.message)
        } finally {
            await this.db.disconnect()
        }
    }
}
