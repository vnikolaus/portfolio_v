import { NextFunction } from "express"
import { Validator } from "../middlewares/Validator"
import { Product } from "../../domain/entities/Product"
import { ProductRepository } from "../repositories/ProductRepository"

type Input = {
    code: string
    description: string
    storage: string
    price: string
    supplier: string
    barcode: string
}

export class AddProduct {
    constructor(private readonly productRepository: ProductRepository) {}

    async exec(input: Input) {
        const existentProduct = await this.productRepository.findByCode(input.code)
        if (existentProduct) throw new Error('Product already exists.')
        const product = new Product(input)
        await this.productRepository.insert(product)
        return product
    }
}