import axios from 'axios'
import { describe, test, vi, expect } from 'vitest'
import { config } from 'dotenv'
config()

describe('Get Product - E2E', () => {
    const e2e_disabled = process.env.E2E === 'false'
    const fake_id = '641d61b5-d446-4b98-80c0-34ae5762bb25'

    test.skipIf(e2e_disabled)('Request should return a single product', async () => {
        const url = `http://localhost:3000/prd?id=${fake_id}`
        const response = await axios.get(url)
        const output = response.data
        expect(output.id).toBeDefined()
    })

    test.skipIf(e2e_disabled)('Return error if invalid id #1', async () => {
        const url = `http://localhost:3000/prd?id=${fake_id + '1'}`
        const response = await axios.get(url)
        const output = response.data
        expect(output).toHaveProperty('error')
    })

    test.skipIf(e2e_disabled)('Return error if invalid id #2', async () => {
        const url = `http://localhost:3000/prd?id=${123123}`
        const response = await axios.get(url)
        const output = response.data
        expect(output).toHaveProperty('error')
    })
})