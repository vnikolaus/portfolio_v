import { Product } from '../../domain/entities/Product'

export class CalculateDispatch {
    execute(products: Product | Product[]) {
        const tax = 0.06

        if (products.length) {
            let sum = 0
            for (const prod of products) {
                sum += prod.total
            }
            return +sum * tax
        }

        return +products.price * tax
    }
}
