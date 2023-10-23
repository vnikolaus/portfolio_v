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
        const products = await calculateTotal.execute(order)

        const calculateDispatch = new CalculateDispatch()
        const dispatch = await calculateDispatch.execute(order.products)

        const newOrder = new SalesOrder({
            ...order,
            products,
            dispatch,
            startedAt: new Date().toLocaleDateString('pt-br'),
        })

        const newOrderProps = await this.repository.add(newOrder.props)
        return newOrderProps
    }
}
