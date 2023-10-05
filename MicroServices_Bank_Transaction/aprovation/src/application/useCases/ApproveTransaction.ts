import { Account } from '../../domain/entities/Account'
import { Transaction } from '../../domain/entities/Transaction'
import { Queue } from '../../infra/queue/Queue'
import { registry } from '../../infra/registry'
import { Registry } from '../../infra/registry/Registry'
import { ValidatesOperation } from './ValidatesOperation'

export class ApproveTransaction {
    private queue: Queue

    constructor(registry: Registry) {
        this.queue = registry.inject('queue')
    }

    async execute(transaction: Transaction, from: Account, to: Account) {
        const approvedTransaction = new Transaction({
            id: transaction.id,
            from,
            to,
            amount: transaction.amount
        })

        approvedTransaction.approve()
        
        await this.queue.publish('approvedTransaction', approvedTransaction)
    }
}
