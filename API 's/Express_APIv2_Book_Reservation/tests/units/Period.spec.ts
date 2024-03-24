import { describe, expect, it } from 'vitest'
import { Period } from '../../src/domain/services/Period'

describe('PERIOD - TEST', () => {
    it('Should calculate a correct dates, based on reserved duration', () => {
        const duration = 20
        const { start_date, end_date } = Period.generateDates(duration)
        const distance = Period.getDistance(start_date, end_date)
        expect(distance).toBe(duration)
    })
})