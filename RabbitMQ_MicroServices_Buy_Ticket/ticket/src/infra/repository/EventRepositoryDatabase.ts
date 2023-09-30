import { EventRepository } from '../../app/repositories/EventReposistory'
import { Event } from '../../domain/entities/Event'
import { Registry } from '../registry/Registry'

export class EventRepositoryDatabase implements EventRepository {
    conn: unknown

    constructor(readonly registry: Registry) {
        this.conn = registry.inject('connection')
    }

    async save(event: Event): Promise<void> {
        await this.conn.query('insert into event (event_id, description, capacity, price, location) values ($1, $2, $3, $4, $5)', [
            ...Object.values(event),
        ])
    }

    async get(id: string): Promise<Ticket> {
        const [event] = await this.conn.query('select * from event where event_id = $1', [id])
        return new Event({
            ...event,
            capacity: +event.capacity,
            price: parseFloat(event.price),
        })
    }
}
