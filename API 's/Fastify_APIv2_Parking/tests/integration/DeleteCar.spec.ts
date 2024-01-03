import { describe, expect, test, vi } from "vitest";
import { parkingRepository } from "../../src/app/controllers/ParkingController";
import { DeleteCar } from "../../src/app/useCases/DeleteCar";

describe('DeleteCar - useCase', () => {
    const deleteCar = new DeleteCar(parkingRepository)

    test('Should delete a parkedCar register', async () => {
        const spy = vi.spyOn(deleteCar, 'exec').mockReturnValue(undefined)
        expect(await deleteCar.exec(0)).toBe(undefined)
        expect(spy.getMockName()).toBe('exec')
        expect(spy).toBeCalledTimes(1)
    })
})