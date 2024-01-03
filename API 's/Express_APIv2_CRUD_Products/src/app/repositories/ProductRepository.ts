import { Product } from "../../domain/entities/Product";

export interface ProductRepository {
    find(): Array<Product>
    findById(id: string): Product
    findByCode(code: string): Product
    insert(product: Product): void
    remove(id: string): void
}