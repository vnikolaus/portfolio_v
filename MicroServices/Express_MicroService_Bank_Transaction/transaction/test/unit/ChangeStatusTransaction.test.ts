import { describe, test, expect } from 'vitest'
import { Transaction } from '../../src/domain/entities/Transaction'
import { afterEach } from 'node:test'

describe('Change Status Transaction - Test', () => {
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

    afterEach(() => {
        transaction.staus = 'pending'
    })
    
    test('should be approve a transaction', async () => {
        transaction.approve()

        expect(transaction.status).toBe('approved')
    })

    test('should be reject a transaction', async () => {
        transaction.reject()

        expect(transaction.status).toBe('rejected')
    })
})