import { describe, test, expect } from 'vitest'
import { Transaction } from '../../src/domain/entities/Transaction'

describe('Create Transaction - Test', () => {
    test('should be create a new account', async () => {
        const acc1 = {
            number: '1',
            agency: '1',
            balance: 100,
            token: 'fake-token-vitest',
            pwd: 'fake-pwd-vitest'
        }

        const acc2 = {
            number: '2',
            agency: '2',
            balance: 100,
            token: 'fake-token-vitest',
            pwd: 'fake-pwd-vitest'
        }

        const transaction = new Transaction({
            from: acc1,
            to: acc2,
            amount: 100
        })
        
        expect(transaction).toHaveProperty('id')
        expect(transaction).toHaveProperty('createdAt')
        expect(transaction.status).toBe('pending')
        
    })
})