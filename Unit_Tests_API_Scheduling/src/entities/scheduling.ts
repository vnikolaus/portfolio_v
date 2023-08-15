import { parseISO } from 'date-fns'
import { z } from 'zod'

const schedulingSchema = z.object({
    customer: z.string().min(3, { message: 'Requires 3 or more characters' }),
    startsAt: z.date(),
    endsAt: z.date(),
})

type SchedulingProps = z.infer<typeof schedulingSchema>

export class Scheduling {
    constructor(private props: SchedulingProps) {
        const { endsAt, startsAt } = props

        if (endsAt <= startsAt) throw new Error('Invalid ends date')

        if (startsAt <= new Date()) throw new Error('Invalid starts date')
    }

    get customer() {
        return this.props.customer
    }

    set startAt(date: Date) {
        if (date > this.startAt) {
            this.endsAt = date
        }
    }

    get startAt() {
        return this.props.startsAt
    }

    set endsAt(date: Date) {
        if (this.endsAt <= this.startAt) throw new Error('Invalid ends date')
        this.endsAt = date
    }

    get endsAt() {
        return this.props.endsAt
    }
}
