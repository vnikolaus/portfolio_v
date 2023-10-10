import { describe, expect, it } from 'vitest'
import { CalculateDispatch } from '../../src/application/useCases/CalculateDispatch'
import { Product } from '../../src/domain/entities/Product'

describe('#Calculate', () => {
    it('Should calculate 6% of the total price as dispatch', async () => {
        const price: Partial<Product> = { price: 150 }

        const calculateDispatch = new CalculateDispatch()
        const value = calculateDispatch.execute(price)

        expect(value).toBe(9)
    })
})
