import { Injectable } from '@nestjs/common'
import { Database } from '../../../database/db.service'
import { VEICULOS_QUERY } from 'src/api/constants/query.constants'

@Injectable()
export class VeiculosRepository {
    constructor(private db: Database) {}

    async list() {
        const conn = await this.db.connection()
        const [rows, fields] = await conn.query(VEICULOS_QUERY)

        return rows
    }
}
