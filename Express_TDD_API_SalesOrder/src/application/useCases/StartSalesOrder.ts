import { SalesOrder } from '../../domain/entities/SalesOrder'
import { SalesOrderRepository } from '../repositories/SalesOrderRepository'
import { CalculateDispatch } from './CalculateDispatch'
import { CalculateTotal } from './CalculateTotal'

export class StartSalesOrder {
    constructor(private repository: SalesOrderRepository) {
        this.repository = repository
    }

    async execute(order: SalesOrder) {
        const calculateTotal = new CalculateTotal()
        const total = calculateTotal.execute(order)

        const calculateDispatch = new CalculateDispatch()
        const dispatch = calculateDispatch.execute(order.products)

        const newOrder: SalesOrder = new SalesOrder({
            ...order,
            dispatch,
            total,
            startedAt: new Date().toLocaleDateString('pt-br'),
        })

        const { props: newOrderProps } = await this.repository.add(newOrder)
        return newOrderProps
    }
}
