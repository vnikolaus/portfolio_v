import { randomUUID as uuid } from 'crypto'

export class Ticket {
    readonly ticket_id: string
    readonly event_id: string
    readonly email: string
    public status: string
    readonly createdAt: Date

    private constructor(props: Ticket) {
        Object.assign(this, props)
    }

    static create(event_id: TicketProps['event_id'], email: TicketProps['email'], ticket_id?: TicketProps['ticket_id']): Ticket {
        const initialStatus = 'reserved'
        const newTicket = new Ticket({
            ticket_id: ticket_id ?? uuid(),
            event_id,
            email,
            status: initialStatus,
            createdAt: new Date(),
        })
        return newTicket
    }

    static restore({ ticket_id, event_id, email, status, createdat }: Ticket) {
        return new Ticket({ ticket_id, event_id, email, status, createdAt: createdat })
    }

    approve() {
        this.status = 'approved'
    }

    reject() {
        this.status = 'rejected'
    }
}

type TicketProps = {
    ticket_id?: string
    event_id: string
    email: string
    status: string
    createdAt: Date
}
