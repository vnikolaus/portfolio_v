import { describe, expect, it } from 'vitest'
import { generateCode } from '../../src/application/helpers/generateCode'
import { Client } from '../../src/domain/entities/Client'
import { Product } from '../../src/domain/entities/Product'
import { SalesOrder } from '../../src/domain/entities/SalesOrder'

describe('#CreateSalesOrder', async () => {
    const { props: clientProps } = new Client({
        name: 'Vitest',
        cnpj: '01.234.567/0001-01',
        active: true,
    })

    const productCode = await generateCode(3, 7)
    const { props: productProps } = new Product({
        code: productCode,
        price: 256.0,
        stock: 100,
        blocked: false,
    })

    it('Should be a instance of SalesOrder', async () => {
        const salesOrder = new SalesOrder({
            client: clientProps,
            products: productProps,
            quantity: 15,
        })

        expect(salesOrder).toBeInstanceOf(SalesOrder)
    })

    it('Should create a new Sales Order', async () => {
        const { props: orderProps } = new SalesOrder({
            client: clientProps,
            products: productProps,
            quantity: 15,
        })

        expect(orderProps).toHaveProperty('id')
    })
})
