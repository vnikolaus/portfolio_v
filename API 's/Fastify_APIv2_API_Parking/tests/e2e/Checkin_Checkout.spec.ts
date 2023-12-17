import { vi, describe, test, expect } from "vitest";
import { config } from "dotenv";
config()
import axios from "axios";

describe('Checkin & Checkout E2E - Test', () => {
    const e2eDisabled = process.env.E2E === 'false'

    test.skipIf(e2eDisabled)('create a new checkin', async () => {
        const urlCheckin = 'http://localhost:3002/checkin'
        const { data: dataCheckin } = await axios.post(urlCheckin, { plate: 'VITEST' })
        expect(dataCheckin.checkin).toBeDefined()
        expect(dataCheckin.plate).toBe('VITEST')

        const urlCheckout = `http://localhost:3002/checkout/${dataCheckin.id}`
        const response = await fetch(urlCheckout, { method: 'POST' })
        const dataCheckout = await response.json()
        expect(dataCheckout.checkout).toBeDefined()
        expect(dataCheckout.plate).toBe('VITEST')
        expect(dataCheckout.total).toBeGreaterThanOrEqual(0)

        const urlDelete = `http://localhost:3002/${dataCheckin.id}`
        await axios.delete(urlDelete)
    })
})