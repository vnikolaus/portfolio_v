import { test, describe, expect } from 'vitest'
import { CreateScheduling } from './createScheduling'
import { Scheduling } from '../entities/scheduling'
import { changeDate } from '../tests/utils/changeDate'
import { MemorySchedulingRepository } from '../repositories/in_memory/memorySchedulingRepository'

const year = new Date().getFullYear()

let i = 1
describe(`############ Test's Create Scheduling's ############`, () => {
    test(`${i++} - Building an new scheduling`, () => {
        const schedulingRepository = new MemorySchedulingRepository()
        const sut = new CreateScheduling(schedulingRepository)
        const startsAt = changeDate(`${year}-06-01`)
        const endsAt = changeDate(`${year}-06-02`)

        expect(
            sut.exec({
                customer: 'John Doe',
                startsAt,
                endsAt,
            })
        ).resolves.toBeInstanceOf(Scheduling)
    })

    test(`${i++} - cannot be create an scheduling with already exists end date or start date`, async () => {
        const schedulingRepository = new MemorySchedulingRepository()
        const sut = new CreateScheduling(schedulingRepository)
        const startsAt = changeDate(`${year}-06-05`)
        const endsAt = changeDate(`${year}-06-15`)

        await sut.exec({
            customer: 'John Doe',
            startsAt,
            endsAt,
        })

        expect(
            sut.exec({
                customer: 'John Doe',
                startsAt: changeDate(`${year}-06-09`),
                endsAt: changeDate(`${year}-06-12`),
            })
        ).rejects.toBeInstanceOf(Error)

        expect(
            sut.exec({
                customer: 'John Doe',
                startsAt: changeDate(`${year}-06-04`),
                endsAt: changeDate(`${year}-06-07`),
            })
        ).rejects.toBeInstanceOf(Error)

        expect(
            sut.exec({
                customer: 'John Doe',
                startsAt: changeDate(`${year}-06-02`),
                endsAt: changeDate(`${year}-06-20`),
            })
        ).rejects.toBeInstanceOf(Error)
    })
})
