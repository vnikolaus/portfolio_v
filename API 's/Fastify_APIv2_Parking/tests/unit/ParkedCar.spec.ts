import { vi, test, describe, expect } from "vitest";
import { ParkedCar } from "../../src/domain/entities/ParkedCar";

describe('ParkedCar Entity - Test', () => {
    test('Should be a instance of ParkedCar', () => {
        const parkedCar = ParkedCar.instance({
            id: 0,
            plate: 'VITEST',
            checkin: '2023-01-01T12:00'
        })
        expect(parkedCar).toBeInstanceOf(ParkedCar)
    })
})