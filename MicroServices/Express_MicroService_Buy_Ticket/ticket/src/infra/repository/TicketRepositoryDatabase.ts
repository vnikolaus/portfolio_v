import { TicketRepository } from '../../app/repositories/TicketRepository'
import { Ticket } from '../../domain/entities/Ticket'
import { Registry } from '../registry/Registry'

export class TicketRepositoryDatabase implements TicketRepository {
    conn: unknown

    constructor(readonly registry: Registry) {
        this.conn = registry.inject('connection')
    }

    async get(id: string): Promise<Ticket> {
        const [data] = await this.conn.query('select * from ticket where ticket_id = $1', [id])
        const ticket = Ticket.restore(data)
        return ticket
    }

    async save(ticket: Ticket): Promise<void> {
        await this.conn.query('insert into ticket (ticket_id, event_id, email, status, createdAt) values ($1, $2, $3, $4, $5)', [
            ...Object.values(ticket),
        ])
    }

    async update(ticket: Ticket): Promise<void> {
        await this.conn.query('update ticket set status = $1 where ticket_id = $2', [ticket.status, ticket.ticket_id])
    }
}
