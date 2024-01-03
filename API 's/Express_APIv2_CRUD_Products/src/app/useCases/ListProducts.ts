import { ProductRepository } from "../repositories/ProductRepository";

export class ListProducts {
    constructor(private readonly productRepository: ProductRepository) {}

    async exec() {
        const products = await this.productRepository.find()
        return products
    }
}