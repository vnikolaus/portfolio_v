import { Transaction } from '../../domain/entities/Transaction'
import { Registry } from '../registry/Registry'

export class QueueController {
    constructor(readonly registry: Registry) {
        const queue = registry.inject('queue')
        const transactionApproval = registry.inject('transactionApproval')

        queue.on('newTransaction', async (data: Transaction) => {
            transactionApproval.execute(JSON.parse(data))
        })
    }
}
