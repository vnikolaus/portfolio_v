import { Injectable } from '@nestjs/common'
import { Database } from '../../../database/db.service'
import { GP_PRODUTO_QUERY } from 'src/api/constants/query.constants'

@Injectable()
export class GrupoAssuntoRepository {
    constructor(private db: Database) {}

    async listGrupoProduto() {
        const conn = await this.db.connection()
        const [rows, fields] = await conn.query(GP_PRODUTO_QUERY)

        return rows
    }
}
