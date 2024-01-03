import { vi, test, describe, expect } from "vitest";
import { GetCar } from "../../src/app/useCases/GetCar";
import { parkingRepository } from "../../src/app/controllers/ParkingController";
import { config } from "dotenv";
config()

describe('GetCar E2E - Test', () => {
    const e2eDisabled = process.env.E2E === 'false'
    const exampleReturn = {
        id: 93,
        plate: 'AAA0001',
        checkin: '2023-12-15T20:02:38.297Z',
        checkout: '2023-12-16T17:55:24.717Z',
        total: 160
    }

    test.skipIf(e2eDisabled)('return a single car', async () => {
        const url = 'http://localhost:3002/93'
        const response = await fetch(url)
        const output = await response.json()
        expect(output).toStrictEqual(exampleReturn)
    })
})