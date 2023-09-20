import { faker } from '@faker-js/faker'
import { getCheckinDetails } from '../helpers/getCheckinDetails'

type FlightDetails = {
    origin: string
    destination: string
    distance: number
    price: number
}

export class Checkin {
    async generate({ origin, destination, distance, price }: FlightDetails) {
        try {
            const { airplane, seat } = await getCheckinDetails(distance)
            const { name: airline, iataCode } = await faker.airline.airline()
            const flightNumber = `${iataCode}${await faker.airline.flightNumber({ length: 4 })}`

            const flightPlan = {
                flightNumber,
                airline,
                airplane,
                origin,
                destination,
                distance: +distance,
                price: +price,
                seat,
            }

            return flightPlan
        } catch (err) {
            console.error(err)
        }
    }
}
