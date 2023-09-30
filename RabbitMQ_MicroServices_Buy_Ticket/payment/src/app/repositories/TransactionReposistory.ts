import { Transaction } from '../../domain/entities/Transaction'

export interface TransactionRepository {
    save(transaction: Transaction): Promise<void>
}
