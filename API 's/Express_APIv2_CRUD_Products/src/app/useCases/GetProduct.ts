import { ProductRepository } from "../repositories/ProductRepository";

export class GetProduct {
    constructor(private readonly productRepository: ProductRepository) {}

    async exec(id: string) {
        return await this.productRepository.findById(id)
    }
}