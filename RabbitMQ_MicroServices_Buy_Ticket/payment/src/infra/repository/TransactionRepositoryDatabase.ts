import { Transaction } from '../../domain/entities/Transaction'
import { Registry } from '../registry/Registry'

export class TransactionRepositoryDatabase {
    private conn: unknown

    constructor(readonly registry: Registry) {
        this.conn = registry.inject('connection')
    }

    async save(transaction: Transaction): Promise<void> {
        await this.conn.query(
            'insert into transaction (transaction_id, ticket_id, event_id, price, tid, status) values ($1, $2, $3, $4, $5, $6)',
            [...Object.values(transaction)]
        )
    }
}
