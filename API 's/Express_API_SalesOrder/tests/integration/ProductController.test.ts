import { afterAll, describe, it, expect } from 'vitest'
import { productRepository } from '../../src/application/repositories'
import { generateCode } from '../../src/application/helpers/generateCode'
import { Product } from '../../src/domain/entities/Product'

describe('#Product - Controller', async () => {
    const codeProduct = await generateCode(3, 7)
    const { props: productProps } = new Product({
        code: codeProduct,
        price: 256.0,
        stock: 100,
        blocked: false,
    })

    afterAll(async () => {
        await productRepository.remove(productProps.id)
    })

    it('Should add a new product', async () => {
        const { props: propsProd } = await productRepository.add(productProps)

        expect(propsProd).toHaveProperty('id')
        expect(propsProd).toHaveProperty('code')
    })

    it('Should list products', async () => {
        const products = await productRepository.list()

        expect(products.length).toBeGreaterThanOrEqual(1)
        expect(products).toContainEqual(productProps)
        expect(products.at(-1)).toStrictEqual(productProps)
    })

    it('Should find a single Product', async () => {
        const productById = await productRepository.find(productProps.id)
        const productByCode = await productRepository.findByCode(productProps.code)

        expect(productById).toStrictEqual(productProps)
        expect(productByCode).toStrictEqual(productProps)
    })

    it('Should throw if not find a Product', async () => {
        expect(productRepository.findByCode(productProps.code + 'x')).rejects.toThrowError(new Error('Product not found'))
    })
})
