import { Product } from "../../domain/entities/Product";
import { GMT } from "../../infra/services/GMT";
import { ProductRepository } from "../repositories/ProductRepository";

export class UpdateProduct {
    constructor(private readonly productRepository: ProductRepository) {}

    async exec(id: string, data: Partial<Product>): Product {
        const oldData = await this.productRepository.findById(id)
        const newData = Object.assign(oldData, {
            ...data,
            updatedAt: GMT.format(new Date())
        })
        const updatedProduct = new Product(newData)
        await this.productRepository.insert(updatedProduct)
        return updatedProduct
    }
}