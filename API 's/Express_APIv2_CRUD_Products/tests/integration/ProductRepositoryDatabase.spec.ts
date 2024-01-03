import { describe, test, vi, expect, beforeAll } from 'vitest'
import { ProductRepositoryDatabase } from '../../src/infra/repositories/implementations/ProductRepositoryDatabase'
import { ProductRepository } from '../../src/app/repositories/ProductRepository'

describe('ProductRepository Test', () => {
    let mockRepository: ProductRepository
    const db = {}
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

    beforeAll(() => {
        mockRepository = new ProductRepositoryDatabase(db)
    })

    test('fn find', async () => {
        const spy = vi.spyOn(mockRepository, 'find').mockReturnValue([mockReturn])
        const list = await mockRepository.find()
        expect(list).toStrictEqual([mockReturn])
        expect(spy.getMockName()).toBe('find')
        expect(spy).toBeCalledTimes(1)
    })

    test('fn findById', async () => {
        const spy = vi.spyOn(mockRepository, 'findById').mockReturnValue(mockReturn)
        const product = await mockRepository.findById(mockReturn.id)
        expect(product).toStrictEqual(mockReturn)
        expect(spy.getMockName()).toBe('findById')
        expect(spy).toBeCalledTimes(1)
    })

    test('fn findByCode', async () => {
        const spy = vi.spyOn(mockRepository, 'findByCode').mockReturnValue(mockReturn)
        const product = await mockRepository.findByCode(mockReturn.code)
        expect(product).toStrictEqual(mockReturn)
        expect(spy.getMockName()).toBe('findByCode')
        expect(spy).toBeCalledTimes(1)
    })
})