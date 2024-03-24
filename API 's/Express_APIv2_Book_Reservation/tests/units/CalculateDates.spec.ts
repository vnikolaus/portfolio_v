import { CalculateDates } from '../../src/app/useCases/CalculateDates'
import { describe, it, expect } from 'vitest'
import { formatDistance } from 'date-fns'
import { Period } from '../../src/domain/services/Period'

describe('CALCULATE DATES - TEST', () => {
    it('Should calculate a correct dates, based on reserved duration', () => {
        const duration = 20
        const { start_date, end_date } = Period.generateDates(duration)
        const distance = Period.getDistance(start_date, end_date)
        expect(distance).toBe(duration)
    })
})