import { TicketRepository } from '../repositories/TicketRepository'

export class ApproveTicket {
    private ticketRepository: TicketRepository

    constructor(readonly registry: Registry) {
        this.ticketRepository = registry.inject('ticketRepository')
    }

    async execute(input: Input): Promise<void> {
        const ticket = await this.ticketRepository.get(input.ticket_id)
        ticket.approve()
        await this.ticketRepository.update(ticket)
    }
}

type Input = {
    ticket_id: string
}
