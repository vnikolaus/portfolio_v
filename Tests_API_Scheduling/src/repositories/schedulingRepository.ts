import { Scheduling } from '../entities/scheduling'

export interface SchedulingRepository {
    make(scheduling: Scheduling): Promise<void>
    checkAvailableTime(startsAt: Date, endsAt: Date): Promise<Scheduling | null>
}
