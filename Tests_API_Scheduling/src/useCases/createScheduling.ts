import { Scheduling } from '../entities/scheduling'
import { SchedulingRepository } from '../repositories/schedulingRepository'

interface CreateSchedulingRequest {
    customer: string
    startsAt: Date
    endsAt: Date
}

type CreateSchedulingResponse = Scheduling

export class CreateScheduling {
    constructor(private schedulingRepository: SchedulingRepository) {}

    async exec({ customer, startsAt, endsAt }: CreateSchedulingRequest): Promise<CreateSchedulingResponse> {
        const checkAvailable = await this.schedulingRepository.checkAvailableTime(startsAt, endsAt)
        if (checkAvailable) throw new Error('Already exists schedulings at this time')

        const scheduling = new Scheduling({ customer, startsAt, endsAt })
        await this.schedulingRepository.make(scheduling)
        return scheduling
    }
}
