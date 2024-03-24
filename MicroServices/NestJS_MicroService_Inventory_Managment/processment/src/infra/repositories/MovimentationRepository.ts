import { Injectable, UnauthorizedException } from '@nestjs/common'
import { Movimentation } from '../../domain/Movimentation'
import { DatabaseService } from '../database/database.service'

@Injectable()
export class MovimentationRepository {
    constructor(private readonly db: DatabaseService) {}

    async save(movimentation: Movimentation) {
        try {
            const conn = await this.db.connect()
            await conn.query(
                'UPDATE "public"."movimentation" SET id = $1, item = $2, quantity = $3, createdat = $4, updatedat = $5, status = $6 WHERE id = $7',
                [
                    movimentation.id,
                    movimentation.item.code,
                    movimentation.quantity,
                    movimentation.createdAt,
                    new Date(),
                    movimentation.status,
                    movimentation.id,
                ],
            )
            conn.done(true)
        } catch (err) {
            throw new UnauthorizedException(err.message)
        } finally {
            await this.db.disconnect()
        }
    }
}
