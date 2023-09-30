import { TicketApproved } from '../../domain/events/TicketApproved'
import { Registry } from '../registry/Registry'

export class QueueController {
    constructor(readonly registry: Registry) {
        const queue = registry.inject('queue')
        const approveTicket = registry.inject('approveTicket')

        queue.on('ticketApproved', async (eventData: TicketApproved) => {
            await approveTicket.execute(JSON.parse(eventData))
        })
    }
}
