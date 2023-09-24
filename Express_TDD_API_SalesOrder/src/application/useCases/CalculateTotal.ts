import { Product } from '../../domain/entities/Product'
import { SalesOrder } from '../../domain/entities/SalesOrder'

export class CalculateTotal {
    execute(order: SalesOrder) {
        const price = +order.products.price
        const quantity = +order.quantity

        return quantity * price
    }
}
