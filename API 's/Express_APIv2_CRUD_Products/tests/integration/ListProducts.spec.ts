import { describe, expect, test, vi } from 'vitest'
import { ListProducts } from '../../src/app/useCases/ListProducts'
import { ProductRepositoryDatabase } from '../../src/infra/repositories/implementations/ProductRepositoryDatabase'

describe('ListProducts Test', () => {
    const mockReturn = [
        {
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
    ]

    test('Return a products list', async () => {
        const db = {}
        const mockRepository = new ProductRepositoryDatabase(db)
        const list = new ListProducts(mockRepository)
        const spy = vi.spyOn(list, 'exec').mockReturnValue(mockReturn)
        const output = await list.exec()
        expect(output).toStrictEqual(mockReturn)
        expect(spy.getMockName()).toBe('exec')
        expect(spy).toBeCalledTimes(1)
    })
})