import { describe, test, expect } from 'vitest'
import { Account } from '../../src/domain/entities/Account'
import { Password } from '../../src/domain/entities/Password'
import { Token } from '../../src/domain/entities/Token'

describe('Microservice - Test', () => {
    test.skip('should be create a new bank transaction', async () => {
        const url = 'http://localhost:3001/new_transaction'
        const input = {
            from: { acc: '1', agency: '1' },
            to: { acc: '2', agency: '2' },
            amount: 1.78
        }
        
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(input),
        })

        const data = await response.json()
        expect(data).toHaveProperty('transaction_id')
        expect(data.status).toBe('pending')
    })
})