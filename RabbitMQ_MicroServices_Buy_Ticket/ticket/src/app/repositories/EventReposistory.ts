import { Event } from '../../domain/entities/Event'

export interface EventRepository {
    save(event: Event): Promise<void>
    get(id: string): Promise<Event>
}
