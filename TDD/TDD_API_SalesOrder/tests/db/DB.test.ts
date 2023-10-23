import { describe, expect, test, it, beforeEach, afterAll } from 'vitest'
import { DB } from '../../src/infra/database/db'
import { Product } from '../../src/domain/entities/Product'
import { generateCode } from '../../src/application/helpers/generateCode'

describe('#Database', async () => {
    let db: DB

    const code = await generateCode(3, 7)
    const { props: productProps } = new Product({
        code,
        price: 256.0,
        stock: 100,
        blocked: false,
    })

    beforeEach(() => {
        db = new DB()
    })

    afterAll(async () => {
        await db.delete('products', productProps.id)
    })

    it('Should be a instance of DB', async () => {
        expect(db).toBeInstanceOf(DB)
    })

    describe('Validate CRUD operations on json database', () => {
        test('#Insert / #Get', async () => {
            await db.insert<Product>('products', productProps)
            const getter = await db.get('products', productProps.id)
            const list = await db.list('products')

            expect(getter).toHaveProperty('id')
            expect(list).toContainEqual(productProps)
        })

        test('#Update', async () => {
            const updData = await db.update<Product>('products', productProps.id, { price: 99 })
            expect(updData.price).toBe(99)
        })

        test('#Delete', async () => {
            await db.delete('products', productProps.id)

            const getter2 = await db.get('products', productProps.id)
            expect(getter2).toBeUndefined()
        })
    })
})
