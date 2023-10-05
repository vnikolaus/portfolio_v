import { TransactionRepository } from '../../application/repositories/TransactionRepository'
import { Transaction } from '../../domain/entities/Transaction'
import { Registry } from '../registry/Registry'

export class TransactionRepositoryDatabase implements TransactionRepository {
    private model: unknown

    constructor(readonly registry: Registry) {
        this.model = registry.inject('transactionModel')
    }

    async get(id: string): Promise<Transaction> {
        const transaction = await this.model.findOne({ id })
        return new Transaction({
            id: transaction.id,
            from: transaction.from,
            to: transaction.to,
            amount: transaction.amount,
            status: transaction.status,
        })
    }

    async save(transaction: Transaction): Promise<void> {
        await this.model.create({
            id: transaction.id,
            from: transaction.from.number,
            to: transaction.to.number,
            amount: transaction.amount,
            status: transaction.status,
            createdAt: new Date().toLocaleDateString('pt-br'),
        })
    }

    async update(id: string, status: string) {
        await this.model.findOneAndUpdate({ id }, { $set: { status } })
    }
}
