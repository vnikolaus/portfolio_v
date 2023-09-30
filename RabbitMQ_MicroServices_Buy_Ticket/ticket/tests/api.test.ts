import { config } from 'dotenv'
import { describe, expect, it } from 'vitest'
config()

describe('API - Test', () => {
    it('should buy a ticket', async () => {
        const input = {
            event_id: '40ea2efd-1f2f-4c41-a2e7-8dec5340f5fa',
            email: 'nk@teste.com',
            creditCardToken: '741852963',
        }

        const response = await fetch(process.env.API_URL, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(input),
        })

        const output = await response.json()

        expect(output).toBeDefined()
        expect(output.ticket_id).toBeDefined()
    })
})
