import { describe, expect, test, vi } from "vitest";
import { parkingRepository } from "../../src/app/controllers/ParkingController";
import { Checkout } from "../../src/app/useCases/Checkout";

describe('Checkout - useCase', () => {
    const mockReturnCheckin = {
        id: 0,
        plate: 'VITEST',
        checkin: '2023-01-01T15:00:00.000Z',
        checkout: '2023-01-01T16:00:00.000Z',
        total: 15
    }

    test('Should create a new checkin', async () => {
        const checkout = new Checkout(parkingRepository)
        const spy = vi.spyOn(checkout, 'exec').mockReturnValue(mockReturnCheckin)
        const parkedCar = await checkout.exec(0)
        expect(spy.getMockName()).toBe('exec')
        expect(spy).toBeCalledTimes(1)
        expect(parkedCar).toStrictEqual(mockReturnCheckin)
    })
})