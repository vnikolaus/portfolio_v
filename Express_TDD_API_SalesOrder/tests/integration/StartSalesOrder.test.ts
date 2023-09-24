import { afterAll, describe, expect, it } from 'vitest'
import { generateCode } from '../../src/application/helpers/generateCode'
import { salesOrderRepository } from '../../src/application/repositories'
import { StartSalesOrder } from '../../src/application/useCases/StartSalesOrder'
import { Client } from '../../src/domain/entities/Client'
import { Product } from '../../src/domain/entities/Product'
import { SalesOrder } from '../../src/domain/entities/SalesOrder'

describe('#StartSalesOrder', async () => {
    const codeClient = await generateCode(0, 6)
    const { props: clientProps } = new Client({
        code: codeClient,
        name: 'Vitest',
        cnpj: '01.234.567/0001-01',
        active: true,
    })

    const codeProduct = await generateCode(3, 7)
    const { props: productProps } = new Product({
        code: codeProduct,
        price: 256.0,
        stock: 100,
        blocked: false,
    })

    it('Should be a instance of StartSalesOrder', async () => {
        const startSalesOrder = new StartSalesOrder()

        expect(startSalesOrder).toBeInstanceOf(StartSalesOrder)
    })

    it('Should start a valid Sales Order', async () => {
        const { props: orderProps } = new SalesOrder({
            client: clientProps,
            products: productProps,
            quantity: 15,
        })

        const startSalesOrder = new StartSalesOrder(salesOrderRepository)
        const newSalesOrder = await startSalesOrder.execute(orderProps)

        expect(newSalesOrder.props).toHaveProperty('id')
        expect(newSalesOrder.props).toHaveProperty('dispatch')
        expect(newSalesOrder.props).toHaveProperty('total')
        expect(newSalesOrder.props).toHaveProperty('startedAt')
        expect(newSalesOrder.props.total).toBe(3840)

        await salesOrderRepository.remove(newSalesOrder.id)
    })
})
