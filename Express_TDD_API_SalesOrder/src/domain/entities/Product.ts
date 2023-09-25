import { Entity } from '../core/Entity'
import { z, ZodError } from 'zod'

type ProductType = {
    code: string
    price: number
    stock: number
    total?: number
    blocked: boolean
}

export class Product extends Entity<ProductType> {
    private constructor(readonly product: ProductType) {
        if (product.blocked) throw new ZodError('Product is blocked')

        const zod = z.object({
            code: z.string().length(10),
            price: z.number(),
            stock: z.number(),
            blocked: z.boolean(),
        })

        zod.parse(product)
        super(product)
    }
}
