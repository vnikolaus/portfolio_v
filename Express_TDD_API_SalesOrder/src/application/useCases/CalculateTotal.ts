import { Product } from '../../domain/entities/Product'
import { SalesOrder } from '../../domain/entities/SalesOrder'

export class CalculateTotal {
    execute(order: SalesOrder) {
        const { quantity, products: { price } } = order

        return quantity * price
    }
}
