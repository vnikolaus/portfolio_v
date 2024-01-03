import { ProductRepository } from "../repositories/ProductRepository";

export class DeleteProduct {
    constructor(private readonly productRepository: ProductRepository) {}

    async exec(id: string) {
        await this.productRepository.remove(id)
    }
}