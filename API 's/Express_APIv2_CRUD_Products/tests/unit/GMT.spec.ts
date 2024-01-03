import { describe, test, vi, expect } from 'vitest'
import { GMT } from '../../src/infra/services/GMT'

describe('GMT Test', () => {
    test('Format date to Brazilian GMT', () => {
        const date = new Date('2023-01-01T12:00:00')
        const formatedDate = GMT.format(date)
        expect(formatedDate).toBe('2023-01-01T12:00:00.000Z')
    })
})