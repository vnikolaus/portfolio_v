import { FlightPlan } from '@prisma/client'

export class FlightPlan {
    flightNumber: string
    airline: string
    airplane: string
    origin: string
    destination: string
    distance: number
    price: number
    seat: string

    constructor(props: Omit<FlightPlan, 'id', 'createdAt', 'updatedAt'>) {
        Object.assign(this, props)
    }
}
