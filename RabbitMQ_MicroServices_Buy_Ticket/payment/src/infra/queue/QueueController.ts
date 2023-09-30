import { TicketReserved } from '../../domain/events/TicketReserved'
import { Registry } from '../registry/Registry'

export class QueueController {
    constructor(readonly registry: Registry) {
        const queue = registry.inject('queue')
        const processPayment = registry.inject('processPayment')

        queue.on('ticketReserved', async (eventData: TicketReserved) => {
            await processPayment.execute(JSON.parse(eventData))
        })
    }
}
