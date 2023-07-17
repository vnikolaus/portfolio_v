import { test, describe, expect } from 'vitest'
import { Scheduling } from './scheduling'
import { changeDate } from '../tests/utils/changeDate'

const year = new Date().getFullYear()
const month = new Date().getMonth() + 1

let i = 1
describe(`############ Test's Scheduling Classes ############`, () => {
    test(`${i++} - can create an scheduling`, () => {
        const startsAt = changeDate(`${year}-${month}-01`)
        const endsAt = changeDate(`${year}-${month}-02`)

        const scheduling = new Scheduling({
            customer: 'John Doe',
            startsAt,
            endsAt,
        })

        expect(scheduling).toBeInstanceOf(Scheduling)
        expect(scheduling.customer).toEqual('John Doe')
    })

    test(`${i++} - cannot create an scheduling with end date <= start date`, () => {
        const startsAt = changeDate(`${year}-${month}-03`)
        const endsAt = changeDate(`${year}-${month}-01`)

        expect(() => {
            return new Scheduling({
                customer: 'John Doe',
                startsAt,
                endsAt,
            })
        }).toThrow()
    })

    test(`${i++} - cannot create an scheduling with start date <= actual date`, () => {
        const startsAt = changeDate(`2020-${month}-01`)
        const endsAt = changeDate(`${year}-${month}-02`)

        expect(() => {
            return new Scheduling({
                customer: 'John Doe',
                startsAt,
                endsAt,
            })
        }).toThrow()
    })
})
