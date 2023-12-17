import { vi, test, describe, expect } from "vitest";
import { GetCar } from "../../src/app/useCases/GetCar";
import { parkingRepository } from "../../src/app/controllers/ParkingController";

describe('GetCar - useCase', () => {
    const getCar = new GetCar(parkingRepository)

    test('Should return a single parkedCar', async () => {
        const mockReturnGetCar = {
            id: 0,
            plate: 'VITEST',
            checkin: '2023-01-01T15:00:00.000Z',
            checkout: null,
            total: null
        }
        const spy = vi.spyOn(getCar, 'exec').mockReturnValue(mockReturnGetCar)
        const parkedCar = await getCar.exec(0)
        expect(spy.getMockName()).toBe('exec')
        expect(spy).toBeCalledTimes(1)
        expect(parkedCar).toStrictEqual(mockReturnGetCar)
    })
})