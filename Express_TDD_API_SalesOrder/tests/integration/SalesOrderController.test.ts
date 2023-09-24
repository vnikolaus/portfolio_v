import { afterAll, describe, expect, it } from 'vitest'
import { generateCode } from '../../src/application/helpers/generateCode'
import { salesOrderRepository } from '../../src/application/repositories'
import { Client } from '../../src/domain/entities/Client'
import { Product } from '../../src/domain/entities/Product'
import { SalesOrder } from '../../src/domain/entities/SalesOrder'

describe('#SalesOrder - Controller', async () => {
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

    const { props: salesOrder } = new SalesOrder({
        client: clientProps,
        products: [productProps],
        quantity: 15,
    })

    const { props: newSaleOrder } = await salesOrderRepository.add(salesOrder)

    afterAll(async () => {
        await salesOrderRepository.remove(newSaleOrder.id)
    })

    it('Should add a new order', async () => {
        expect(newSaleOrder).toHaveProperty('id')
        expect(newSaleOrder.client).toStrictEqual(clientProps)
        expect(newSaleOrder.products).toContainEqual(productProps)
    })

    it('Should list sales orders', async () => {
        const orders = await salesOrderRepository.list()

        expect(orders.length).toBeGreaterThanOrEqual(1)
        expect(orders).toContainEqual(salesOrder)
    })

    it('Should find a single Product', async () => {
        const findedOrder = await salesOrderRepository.find(salesOrder.id)

        expect(findedOrder).toStrictEqual(salesOrder)
    })
})
