import { Product } from '../../domain/entities/Product'

export class CalculateDispatch {
    execute({ price }: Partial<Product>) {
        const tax = 0.06
        return +price * tax
    }
}
