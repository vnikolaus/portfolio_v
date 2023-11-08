import { describe, test, expect } from 'vitest'
import { afterEach } from 'node:test'
import { Transaction } from '../src/domain/entities/Transaction'

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
    
    test('should be complete a transaction', async () => {
        transaction.approve()

        expect(transaction.status).toBe('done')
    })

    test('should be reject a transaction', async () => {
        transaction.reject()

        expect(transaction.status).toBe('rejected')
    })
})