import { ProductRepository } from "../repositories/ProductRepository";

export class GetProduct {
    constructor(private readonly productRepository: ProductRepository) {}

    async exec(id: string) {
        const product = await this.productRepository.findById(id)
        return product
    }
}