import { Request, Response } from 'express'
import { ProductRepository } from '../repositories/ProductRepository'
import { Product } from '../../domain/entities/Product'

export class ProductController {
    constructor(private repository: ProductRepository) {}

    async list(req: Request, res: Response) {
        const products = await this.repository.list()
        return res.json({ products })
    }

    async find(req: Request, res: Response) {
        const { id } = req.params
        const product = await this.repository.find(id)
        return res.json({ product })
    }

    async findByCode(req: Request, res: Response) {
        const { code } = req.params
        const product = await this.repository.findByCode(code)
        return res.json({ product })
    }

    async add(req: Request, res: Response) {
        const products = req.body

        if (products.length) {
            const newProducts: Product[] = []
            for (const prod of products) {
                const savedProduct = await this.repository.add(prod)
                newProducts.push(savedProduct.props)
            }
            return res.status(201).json({ newProducts: newProducts })
        }

        const newProduct = await this.repository.add(products)
        return res.status(201).json({ newProducts: newProduct.props })
    }
}
