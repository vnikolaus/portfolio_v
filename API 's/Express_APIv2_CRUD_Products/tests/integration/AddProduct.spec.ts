import { describe, test, vi, expect, beforeAll } from 'vitest'
import { ProductRepositoryDatabase } from '../../src/infra/repositories/implementations/ProductRepositoryDatabase'
import { ProductRepository } from '../../src/app/repositories/ProductRepository'
import { AddProduct } from '../../src/app/useCases/AddProduct'

describe('AddProduct Test', () => {
    const mockReturn = {
        id: "641d61b5-d446-4b98-80c0-34ae5762bb25",
        code: "PRD-VITEST",
        description: "PRODUTO-TESTE",
        storage: "01",
        price: "100",
        supplier: "vitest",
        barcode: "VITEST-01",
        createdAt: "2024-01-03T16:28:11.366Z",
        updatedAt: "2024-01-03T17:44:42.219Z"
    }

    test('Add a new product', async () => {
        const db = {}
        const mockRepository = new ProductRepositoryDatabase(db)
        const input = {
            code: "PRD-VITEST",
            description: "PRODUTO-TESTE",
            storage: "01",
            price: "100",
            supplier: "vitest",
            barcode: "VITEST-01",
        }
        const add = new AddProduct(mockRepository)
        const spy = vi.spyOn(add, 'exec').mockReturnValue(mockReturn)
        const output = await add.exec(input)
        expect(output).toStrictEqual(mockReturn)
        expect(spy.getMockName()).toBe('exec')
        expect(spy).toBeCalledTimes(1)
    })
})