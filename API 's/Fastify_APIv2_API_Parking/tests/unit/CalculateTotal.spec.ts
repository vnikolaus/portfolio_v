import { vi, test, describe, expect } from "vitest";
import { CalculateTotal } from "../../src/app/useCases/CalculateTotal";

describe('CalculateTotal - useCase', () => {
    test('calculate 15 minutes', async () => {
        const checkin = new Date('2023-01-01T12:00:00.000Z')
        const checkout = new Date('2023-01-01T12:15:00.000Z')
        const calculate = new CalculateTotal()
        const total = await calculate.exec(checkin, checkout)
        expect(total).toBe(0)
    })

    test('calculate 30 minutes', async () => {
        const checkin = new Date('2023-01-01T12:00:00.000Z')
        const checkout = new Date('2023-01-01T12:30:00.000Z')
        const calculate = new CalculateTotal()
        const total = await calculate.exec(checkin, checkout)
        expect(total).toBe(15)
    })

    test('calculate 1 hour', async () => {
        const checkin = new Date('2023-01-01T12:00:00.000Z')
        const checkout = new Date('2023-01-01T13:00:00.000Z')
        const calculate = new CalculateTotal()
        const total = await calculate.exec(checkin, checkout)
        expect(total).toBe(15)
    })

    test('calculate 1:30 hour', async () => {
        const checkin = new Date('2023-01-01T12:00:00.000Z')
        const checkout = new Date('2023-01-01T13:30:00.000Z')
        const calculate = new CalculateTotal()
        const total = await calculate.exec(checkin, checkout)
        expect(total).toBe(15)
    })

    test('calculate 1:59 hour', async () => {
        const checkin = new Date('2023-01-01T12:00:00.000Z')
        const checkout = new Date('2023-01-01T13:59:59.000Z')
        const calculate = new CalculateTotal()
        const total = await calculate.exec(checkin, checkout)
        expect(total).toBe(15)
    })

    test('calculate 2 hours', async () => {
        const checkin = new Date('2023-01-01T12:00:00.000Z')
        const checkout = new Date('2023-01-01T14:00:00.000Z')
        const calculate = new CalculateTotal()
        const total = await calculate.exec(checkin, checkout)
        expect(total).toBe(25)
    })

    test('calculate 3 hours', async () => {
        const checkin = new Date('2023-01-01T12:00:00.000Z')
        const checkout = new Date('2023-01-01T15:00:00.000Z')
        const calculate = new CalculateTotal()
        const total = await calculate.exec(checkin, checkout)
        expect(total).toBe(35)
    })

    test('calculate 6 hours', async () => {
        const checkin = new Date('2023-01-01T12:00:00.000Z')
        const checkout = new Date('2023-01-01T18:00:00.000Z')
        const calculate = new CalculateTotal()
        const total = await calculate.exec(checkin, checkout)
        expect(total).toBe(65)
    })

    test('calculate 9 hours', async () => {
        const checkin = new Date('2023-01-01T12:00:00.000Z')
        const checkout = new Date('2023-01-01T21:00:00.000Z')
        const calculate = new CalculateTotal()
        const total = await calculate.exec(checkin, checkout)
        expect(total).toBe(95)
    })

    test('calculate 12 hours', async () => {
        const checkin = new Date('2023-01-01T12:00:00.000Z')
        const checkout = new Date('2023-01-02T00:00:00.000Z')
        const calculate = new CalculateTotal()
        const total = await calculate.exec(checkin, checkout)
        expect(total).toBe(125)
    })

    test('calculate 18 hours', async () => {
        const checkin = new Date('2023-01-01T12:00:00.000Z')
        const checkout = new Date('2023-01-02T08:00:00.000Z')
        const calculate = new CalculateTotal()
        const total = await calculate.exec(checkin, checkout)
        expect(total).toBe(180)
    })

    test('calculate 24 hours', async () => {
        const checkin = new Date('2023-01-01T12:00:00.000Z')
        const checkout = new Date('2023-01-02T12:00:00.000Z')
        const calculate = new CalculateTotal()
        const total = await calculate.exec(checkin, checkout)
        expect(total).toBe(180)
    })

    test('calculate 30 hours', async () => {
        const checkin = new Date('2023-01-01T12:00:00.000Z')
        const checkout = new Date('2023-01-02T18:00:00.000Z')
        const calculate = new CalculateTotal()
        const total = await calculate.exec(checkin, checkout)
        expect(total).toBe(245)
    })

    test('calculate 36 hours', async () => {
        const checkin = new Date('2023-01-01T12:00:00.000Z')
        const checkout = new Date('2023-01-03T00:00:00.000Z')
        const calculate = new CalculateTotal()
        const total = await calculate.exec(checkin, checkout)
        expect(total).toBe(305)
    })

    test('calculate 42 hours', async () => {
        const checkin = new Date('2023-01-01T12:00:00.000Z')
        const checkout = new Date('2023-01-03T08:00:00.000Z')
        const calculate = new CalculateTotal()
        const total = await calculate.exec(checkin, checkout)
        expect(total).toBe(360)
    })

    test('calculate 48 hours', async () => {
        const checkin = new Date('2023-01-01T12:00:00.000Z')
        const checkout = new Date('2023-01-03T12:00:00.000Z')
        const calculate = new CalculateTotal()
        const total = await calculate.exec(checkin, checkout)
        expect(total).toBe(360)
    })

    test('calculate 60 hours', async () => {
        const checkin = new Date('2023-01-01T12:00:00.000Z')
        const checkout = new Date('2023-01-04T00:00:00.000Z')
        const calculate = new CalculateTotal()
        const total = await calculate.exec(checkin, checkout)
        expect(total).toBe(485)
    })

    test('calculate 72 hours', async () => {
        const checkin = new Date('2023-01-01T12:00:00.000Z')
        const checkout = new Date('2023-01-04T12:00:00.000Z')
        const calculate = new CalculateTotal()
        const total = await calculate.exec(checkin, checkout)
        expect(total).toBe(540)
    })

    test('calculate 84 hours', async () => {
        const checkin = new Date('2023-01-01T12:00:00.000Z')
        const checkout = new Date('2023-01-05T00:00:00.000Z')
        const calculate = new CalculateTotal()
        const total = await calculate.exec(checkin, checkout)
        expect(total).toBe(665)
    })

    test('calculate 90 hours', async () => {
        const checkin = new Date('2023-01-01T12:00:00.000Z')
        const checkout = new Date('2023-01-05T06:00:00.000Z')
        const calculate = new CalculateTotal()
        const total = await calculate.exec(checkin, checkout)
        expect(total).toBe(720)
    })

    test('calculate 96 hours', async () => {
        const checkin = new Date('2023-01-01T12:00:00.000Z')
        const checkout = new Date('2023-01-05T12:00:00.000Z')
        const calculate = new CalculateTotal()
        const total = await calculate.exec(checkin, checkout)
        expect(total).toBe(720)
    })

    test('calculate 108 hours', async () => {
        const checkin = new Date('2023-01-01T12:00:00.000Z')
        const checkout = new Date('2023-01-06T00:00:00.000Z')
        const calculate = new CalculateTotal()
        const total = await calculate.exec(checkin, checkout)
        expect(total).toBe(845)
    })

    test('calculate 120 hours', async () => {
        const checkin = new Date('2023-01-01T12:00:00.000Z')
        const checkout = new Date('2023-01-06T12:00:00.000Z')
        const calculate = new CalculateTotal()
        const total = await calculate.exec(checkin, checkout)
        expect(total).toBe(900)
    })

    test('calculate 132 hours', async () => {
        const checkin = new Date('2023-01-01T12:00:00.000Z')
        const checkout = new Date('2023-01-07T00:00:00.000Z')
        const calculate = new CalculateTotal()
        const total = await calculate.exec(checkin, checkout)
        expect(total).toBe(1025)
    })

    test('calculate 138 hours', async () => {
        const checkin = new Date('2023-01-01T12:00:00.000Z')
        const checkout = new Date('2023-01-07T06:00:00.000Z')
        const calculate = new CalculateTotal()
        const total = await calculate.exec(checkin, checkout)
        expect(total).toBe(1080)
    })

    test('calculate 144 hours', async () => {
        const checkin = new Date('2023-01-01T12:00:00.000Z')
        const checkout = new Date('2023-01-07T12:00:00.000Z')
        const calculate = new CalculateTotal()
        const total = await calculate.exec(checkin, checkout)
        expect(total).toBe(1080)
    })

    test('calculate 156 hours', async () => {
        const checkin = new Date('2023-01-01T12:00:00.000Z')
        const checkout = new Date('2023-01-08T00:00:00.000Z')
        const calculate = new CalculateTotal()
        const total = await calculate.exec(checkin, checkout)
        expect(total).toBe(1205)
    })

    test('calculate 168 hours', async () => {
        const checkin = new Date('2023-01-01T12:00:00.000Z')
        const checkout = new Date('2023-01-08T12:00:00.000Z')
        const calculate = new CalculateTotal()
        const total = await calculate.exec(checkin, checkout)
        expect(total).toBe(1260)
    })
})