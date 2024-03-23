import { faker } from '@faker-js/faker'
import { getDistance } from '../helpers/getDistance'
import { getIataCode } from '../helpers/getIataCode'

export class CalculateTaxes {
    #taxes = 1.7

    async calculate(origin: string, destination: string) {
        const promises = [getDistance(origin, destination), getIataCode(origin), getIataCode(destination)]
        const arr = await Promise.all(promises)
        const price = (arr[0] * this.#taxes).toFixed(2)

        let t = true,
            v = true,
            i = 0,
            airportOrigin = '',
            airportDestination = ''

        while (t || v) {
            const { name, iataCode } = await faker.airline.airport()

            if (iataCode === arr[1]) {
                airportOrigin = name
                t = false
            } else if (iataCode === arr[2]) {
                airportDestination = name
                v = false
            }

            if (i === 2e4) {
                airportOrigin = airportOrigin === '' ? `ICAO: '${arr[1]}' unmatch` : airportOrigin
                airportDestination = airportDestination === '' ? `ICAO: '${arr[2]}' unmatch` : airportDestination
                v = false
                t = false
            }

            i++
        }

        return {
            airportOrigin,
            airportDestination,
            distance: arr[0],
            price,
        }
    }
}
