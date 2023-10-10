import { SalesOrder } from '../../domain/entities/SalesOrder'

export class CalculateTotal {
    execute(order: SalesOrder) {
        const { quantity, products } = order

        if (products.length) {
            for (const prod of products) {
                prod.total = +prod.price * +quantity
            }
            return products
        }

        products.total = +products.price * +quantity
        return products
    }
}
