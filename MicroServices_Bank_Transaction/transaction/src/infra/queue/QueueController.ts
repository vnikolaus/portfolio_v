import { Registry } from '../registry/Registry'

export class QueueController {
    constructor(readonly registry: Registry) {
        const queue = registry.inject('queue')
        const closeApprovedTransaction = registry.inject('closeApprovedTransaction')
        const closeRejectedTransaction = registry.inject('closeRejectedTransaction')

        queue.on('approvedTransaction', async (data) => {
            await closeApprovedTransaction.execute(JSON.parse(data))
        })        
        
        queue.on('rejectedTransaction', async (data) => {
            await closeRejectedTransaction.execute(JSON.parse(data))
        })
    }
}
