import { describe, test, vi, expect } from 'vitest'
import { Product } from '../../src/domain/entities/Product'

describe('Product Entity - Test', () => {
    test('Should create a new instance of Product', () => {
        const product = new Product({
            code: "PRD-VITEST",
            description: "PRODUTO-TESTE",
            storage: "01",
            price: "100",
            supplier: "vitest",
            barcode: "VITEST-01"
        })
        expect(product).toBeInstanceOf(Product)
    })
})