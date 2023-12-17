import { vi, test, describe, expect } from "vitest";
import { Checkin } from "../../src/app/useCases/Checkin";
import { parkingRepository } from "../../src/app/controllers/ParkingController";

describe('Checkin - useCase', () => {
    const mockReturnCheckin = {
        id: 0,
        plate: 'VITEST',
        checkin: '2023-01-01T15:00:00.000Z',
        checkout: null,
        total: null
    }

    test('Should create a new checkin', async () => {
        const checkin = new Checkin(parkingRepository)
        const spy = vi.spyOn(checkin, 'exec').mockReturnValue(mockReturnCheckin)
        const parkedCar = await checkin.exec('VITEST')
        expect(spy.getMockName()).toBe('exec')
        expect(spy).toBeCalledTimes(1)
        expect(parkedCar).toStrictEqual(mockReturnCheckin)
    })
})