import { Account } from '../../domain/entities/Account'
import { Transaction } from '../../domain/entities/Transaction'
import { Queue } from '../../infra/queue/Queue'
import { registry } from '../../infra/registry'
import { Registry } from '../../infra/registry/Registry'
import { ValidatesOperation } from './ValidatesOperation'

export class RejectTransaction {
    private queue: Queue

    constructor(registry: Registry) {
        this.queue = registry.inject('queue')
    }

    async execute(transaction: Transaction) {
        const rejectedTransaction = new Transaction({ ...transaction })
        
        rejectedTransaction.reject()
        
        await this.queue.publish('rejectedTransaction', rejectedTransaction)
    }
}
