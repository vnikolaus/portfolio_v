import { ProductRepository } from "../repositories/ProductRepository";

export class ListProducts {
    constructor(private readonly productRepository: ProductRepository) {}

    async exec() {
        return await this.productRepository.find()
    }
}