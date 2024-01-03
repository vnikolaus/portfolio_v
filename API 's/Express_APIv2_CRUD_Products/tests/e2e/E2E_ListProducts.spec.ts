import axios from 'axios'
import { describe, test, vi, expect } from 'vitest'
import { config } from 'dotenv'
config()

describe('List Products - E2E', () => {
    const e2e_disabled = process.env.E2E === 'false'

    test.skipIf(e2e_disabled)('Request should return a list of all products', async () => {
        const url = 'http://localhost:3000/prd/list'
        const response = await axios.get(url)
        const output = response.data
        expect(Array.isArray(output)).toBeTruthy()
        expect(output.at(-1)).toHaveProperty('id')
    })
})