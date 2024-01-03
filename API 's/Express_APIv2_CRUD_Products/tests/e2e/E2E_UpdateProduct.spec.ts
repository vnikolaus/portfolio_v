import axios from 'axios'
import { describe, test, vi, expect } from 'vitest'
import { config } from 'dotenv'
config()

describe('Update Product - E2E', () => {
    const e2e_disabled = process.env.E2E === 'false'
    const fake_id = '641d61b5-d446-4b98-80c0-34ae5762bb25'

    test.skipIf(e2e_disabled)('Request should update a existent product', async () => {
        const urlGet = `http://localhost:3000/prd?id=${fake_id}`
        const responseGet = await axios.get(urlGet)
        const existentProduct = responseGet.data
        expect(existentProduct.price).toBe('100')

        const urlUpdate = `http://localhost:3000/prd/update/${fake_id}`
        const updateData = {
            ...existentProduct,
            price: '150'
        }
        const responseUpdate = await axios.patch(urlUpdate, updateData)
        const updatedProduct = responseUpdate.data
        expect(updatedProduct.price).toBe('150')

        await axios.patch(urlUpdate, existentProduct)
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

    test.skipIf(e2e_disabled)('Return error if invalid body #1', async () => {
        const url = `http://localhost:3000/prd/update/${fake_id}`
        const body = {
            description: "PRODUTO-TESTE",
            storage: "01",
            price: "100",
            supplier: "vitest-error",
            barcode: "VITEST-01"
        }
        const response = await axios.patch(url, body)
        const output = response.data
        expect(output).toHaveProperty('error')
    })

    test.skipIf(e2e_disabled)('Return error if invalid body #2', async () => {
        const url = `http://localhost:3000/prd/update/${fake_id}`
        const body = {
            description: "PRODUTO-TESTE",
            storage: "01",
            price: "100",
            supplier: "vitest",
            barcode: "VITEST-01-error"
        }
        const response = await axios.patch(url, body)
        const output = response.data
        expect(output).toHaveProperty('error')
    })
    
    test.skipIf(e2e_disabled)('Return error if invalid body #3', async () => {
        const url = `http://localhost:3000/prd/update/${fake_id}`
        const body = {
            description: "PRODUTO-TESTE",
            storage: 10,
            price: 150,
            supplier: "vitest",
            barcode: "VITEST-01"
        }
        const response = await axios.patch(url, body)
        const output = response.data
        expect(output).toHaveProperty('error')
    })
})