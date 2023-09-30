import { Ticket } from '../../domain/entities/Ticket'

export interface TicketRepository {
    save(ticket: Ticket): Promise<void>
    update(ticket: Ticket): Promise<Ticket>
    get(id: string): Promise<Ticket>
}
