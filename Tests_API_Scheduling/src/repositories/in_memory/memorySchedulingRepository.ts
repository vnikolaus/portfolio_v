import { areIntervalsOverlapping } from 'date-fns'
import { Scheduling } from '../../entities/scheduling'
import { SchedulingRepository } from '../schedulingRepository'

export class MemorySchedulingRepository implements SchedulingRepository {
    public items: Scheduling[] = []

    async make(scheduling: Scheduling): Promise<void> {
        this.items.push(scheduling)
    }

    async checkAvailableTime(startsAt: Date, endsAt: Date): Promise<Scheduling | null> {
        const scheduling = this.items.find((item) => {
            return areIntervalsOverlapping(
                { start: startsAt, end: endsAt },
                { start: item.startAt, end: item.endsAt },
                { inclusive: true }
            )
        })

        if (!scheduling) return null

        return scheduling
    }
}
