import { Injectable } from '@nestjs/common'
import { Database } from '../../../database/db.service'
import { PRODUTOS_QUERY } from 'src/api/constants/query.constants'

@Injectable()
export class ProdutosRepository {
    constructor(private db: Database) {}

    async list() {
        const conn = await this.db.connection()
        const [rows, fields] = await conn.query(PRODUTOS_QUERY)

        return rows
    }
}
