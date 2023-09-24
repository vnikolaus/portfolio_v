import { describe, expect, it } from 'vitest'
import { generateCode } from '../../src/application/helpers/generateCode'
import { Product } from '../../src/domain/entities/Product'
import { ZodError } from 'zod'

describe('#Create', () => {
    it('Should create a valid product', async () => {
        const code = await generateCode(3, 7)
        const { props: productProps } = new Product({
            code,
            price: 256.0,
            stock: 100,
            blocked: false,
        })

        expect(productProps).toHaveProperty('id')
        expect(productProps.code).toHaveLength(10)
    })

    it('Should not create a invalid product', async () => {
        expect(
            () =>
                new Product({
                    code: '01234567891011',
                    price: 112.0,
                    stock: 50,
                    blocked: false,
                })
        ).toThrowError(ZodError)
    })

    it('Should not create a blocked product', async () => {
        const code = await generateCode(3, 7)
        expect(
            () =>
                new Product({
                    code,
                    price: 150.0,
                    stock: 12,
                    blocked: true,
                })
        ).toThrowError(ZodError)
    })
})
