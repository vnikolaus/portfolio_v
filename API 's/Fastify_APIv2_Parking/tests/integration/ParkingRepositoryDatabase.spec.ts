import { vi, test, describe, expect } from "vitest";
import { ParkingRepositoryDatabase } from "../../src/infra/repositories/ParkingRepositoryDatabase";
import { fastify } from "../../src/app/controllers/ParkingController";

describe('Parking Repository DB - Test', () => {
    const parkingRepository = new ParkingRepositoryDatabase(fastify.app)

    test('fn get', async () => {
        const mockReturnGet = {
            id: 0,
            plate: 'VITEST',
            checkin: '2023-01-01T15:00:00.000Z',
            checkout: null,
            total: null
        }
        const spy = vi.spyOn(parkingRepository, 'get').mockReturnValue(mockReturnGet)
        const parkedCar = await parkingRepository.get(0)
        expect(spy.getMockName()).toBe('get')
        expect(spy).toBeCalledTimes(1)
        expect(parkedCar).toStrictEqual(mockReturnGet)
    })

    test('fn getByPlate', async () => {
        const mockReturnGetByPlate = {
            id: 0,
            plate: 'VITEST',
            checkin: '2023-01-01T15:00:00.000Z',
            checkout: null,
            total: null
        }
        const spy = vi.spyOn(parkingRepository, 'getByPlate').mockReturnValue(mockReturnGetByPlate)
        const parkedCar = await parkingRepository.getByPlate('VITEST')
        expect(spy.getMockName()).toBe('getByPlate')
        expect(spy).toBeCalledTimes(1)
        expect(parkedCar).toStrictEqual(mockReturnGetByPlate)
    })

    test('fn add', async () => {
        const mockReturnAdd = {
            id: 0,
            plate: 'VITEST',
            checkin: '2023-01-01T15:00:00.000Z',
            checkout: null,
            total: null
        }
        const spy = vi.spyOn(parkingRepository, 'add').mockReturnValue(mockReturnAdd)
        const parkedCar = await parkingRepository.add('VITEST', new Date('2023-01-01T15:00:00.000Z'))
        expect(spy.getMockName()).toBe('add')
        expect(spy).toBeCalledTimes(1)
        expect(parkedCar).toStrictEqual(mockReturnAdd)
    })

    test('fn update', async () => {
        const mockInputUpdate = {
            id: 0,
            plate: 'VITEST',
            checkin: '2023-01-01T15:00:00.000Z',
            checkout: '2023-01-01T16:00:00.000Z',
            total: 15
        }
        const spy = vi.spyOn(parkingRepository, 'update').mockReturnValue(undefined)
        expect(await parkingRepository.update(mockInputUpdate)).toBe(undefined)
        expect(spy.getMockName()).toBe('update')
        expect(spy).toBeCalledTimes(1)
    })

    test('fn delete', async () => {
        const spy = vi.spyOn(parkingRepository, 'delete').mockReturnValue(undefined)
        expect(await parkingRepository.delete(0)).toBe(undefined)
        expect(spy.getMockName()).toBe('delete')
        expect(spy).toBeCalledTimes(1)
    })
})