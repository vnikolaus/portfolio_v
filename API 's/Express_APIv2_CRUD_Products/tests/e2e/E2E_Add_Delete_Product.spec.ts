import axios from 'axios'
import { describe, test, vi, expect } from 'vitest'
import { config } from 'dotenv'
config()

describe('Add / Delete Product - E2E', () => {
    const e2e_disabled = process.env.E2E === 'false'
    
    test.skipIf(e2e_disabled)('Request should insert a new product', async () => {
        const url = 'http://localhost:3000/prd/insert'
        const product = {
            code: 'PRD-VITEST-2',
            description: 'PRODUTO-TESTE',
            storage: '01',
            price: '100',
            supplier: 'vitest',
            barcode: 'VITEST-02',
        }
        const response = await axios.post(url, product)
        const output = response.data
        expect(output.id).toBeDefined()

        const urlDelete = `http://localhost:3000/prd/delete/${output.id}`
        const responseDelete = await axios.delete(urlDelete)
        const result = responseDelete.data
        expect(result.deleted_id).toBeDefined()

        const urlList = 'http://localhost:3000/prd/list'
        const responseList = await axios.get(urlList)
        const products = responseList.data.find(el => el.id === result.deleted_id)
        expect(products).toBeUndefined()
    })

    test.skipIf(e2e_disabled)('Return error if any field is missing in the request', async () => {
        const url = 'http://localhost:3000/prd/insert'
        const product = {
            code: 'PRD-VITEST-2',
            description: 'PRODUTO-TESTE',
            storage: '01',
            supplier: 'vitest',
            barcode: 'VITEST-02',
        }
        const response = await axios.post(url, product)
        const output = response.data
        expect(output).toHaveProperty('error')
    })

    test.skipIf(e2e_disabled)('Return error if field type is not a string', async () => {
        const url = 'http://localhost:3000/prd/insert'
        const product = {
            code: 'PRD-VITEST-2',
            description: 'PRODUTO-TESTE',
            storage: 15,
            price: 100,
            supplier: 'vitest',
            barcode: 'VITEST-02',
        }
        const response = await axios.post(url, product)
        const output = response.data
        expect(output).toHaveProperty('error')
    })
})