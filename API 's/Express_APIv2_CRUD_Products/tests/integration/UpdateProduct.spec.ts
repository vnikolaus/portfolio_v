import { describe, expect, test, vi } from 'vitest'
import { UpdateProduct } from '../../src/app/useCases/UpdateProduct'
import { ProductRepositoryDatabase } from '../../src/infra/repositories/implementations/ProductRepositoryDatabase'

describe('UpdateProduct Test', () => {
    const db = {}
    const mockRepository = new ProductRepositoryDatabase(db)
    const mockReturn = {
        id: "641d61b5-d446-4b98-80c0-34ae5762bb25",
        code: "PRD-VITEST",
        description: "PRODUTO-TESTE",
        storage: "01",
        price: "150",
        supplier: "vitest",
        barcode: "VITEST-01",
        createdAt: "2024-01-03T16:28:11.366Z",
        updatedAt: "2024-01-03T17:44:42.219Z"
    }

    test('Update a existent product', async () => {
        const id = '641d61b5-d446-4b98-80c0-34ae5762bb25'
        const input = { price: "150" }
        const update = new UpdateProduct(mockRepository)
        const spy = vi.spyOn(update, 'exec').mockReturnValue(mockReturn)
        const output = await update.exec(id, input)
        expect(output).toStrictEqual(mockReturn)
        expect(spy.getMockName()).toBe('exec')
        expect(spy).toBeCalledTimes(1)
    })
})