import { Ticket } from '../../domain/entities/Ticket'
import { TicketReserved } from '../../domain/events/TicketReserved'
import { Queue } from '../../infra/queue/Queue'
import { Registry } from '../../infra/registry/Registry'
import { EventRepository } from '../repositories/EventReposistory'
import { TicketRepository } from '../repositories/TicketRepository'

export class BuyTicket {
    private eventRepository: EventRepository
    private ticketRepository: TicketRepository
    private queue: Queue

    constructor(readonly registry: Registry) {
        this.eventRepository = registry.inject('eventRepository')
        this.ticketRepository = registry.inject('ticketRepository')
        this.queue = registry.inject('queue')
    }

    async execute({ event_id, email, creditCardToken }: Input): Promise<Output> {
        const event = await this.eventRepository.get(event_id)
        const ticket = Ticket.create(event_id, email)
        await this.ticketRepository.save(ticket)
        const reservedTicket = new TicketReserved({
            ticket_id: ticket.ticket_id,
            event_id,
            email,
            creditCardToken,
            price: event.price,
        })

        await this.queue.publish('ticketReserved', reservedTicket)

        return {
            ticket_id: ticket.ticket_id,
        }
    }
}

type Input = {
    event_id: string
    email: string
    creditCardToken: string
}

type Output = {
    ticket_id: string
}
