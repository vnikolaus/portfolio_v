import { Transaction } from '../../domain/entities/Transaction'

export interface TransactionRepository {
    save(transaction: Transaction): Promise<void>
    get(id: string): Promise<Transaction>
    update(id: string, status: string): Promise<void>
}
