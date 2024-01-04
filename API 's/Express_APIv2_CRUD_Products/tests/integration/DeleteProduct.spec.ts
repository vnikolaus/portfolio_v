import { describe, expect, test, vi } from 'vitest'
import { DeleteProduct } from '../../src/app/useCases/DeleteProduct'
import { ProductRepositoryDatabase } from '../../src/infra/repositories/implementations/ProductRepositoryDatabase'

describe('DeleteProduct Test', () => {
    const mockReturn = { deleted_id: "641d61b5-d446-4b98-80c0-34ae5762bb25" }

    test('Delete a existent product', async () => {
        const db = {}
        const mockRepository = new ProductRepositoryDatabase(db)
        const id = "641d61b5-d446-4b98-80c0-34ae5762bb25"
        const del = new DeleteProduct(mockRepository)
        const spy = vi.spyOn(del, 'exec').mockReturnValue(mockReturn)
        const output = await del.exec(id)
        expect(output).toStrictEqual(mockReturn)
        expect(spy.getMockName()).toBe('exec')
        expect(spy).toBeCalledTimes(1)
    })
})