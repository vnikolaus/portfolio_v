import { Product } from '../../domain/entities/Product'
import { DB } from '../../infra/database/db'

interface RepoPD {
    list(): Promise<Product[]>
    find(id: string): Promise<Product>
    add(product: Product): Promise<Product>
    remove(id: string): Promise<void>
}

export class ProductRepository implements RepoPD {
    private readonly db: DB

    constructor(database: DB) {
        this.db = database
    }

    async list() {
        return await this.db.list('products')
    }

    async find(id: string) {
        return await this.db.get('products', id)
    }

    async findByCode(code: string) {
        const products = await this.db.list('products')
        const findedProduct = products.find((product) => product.code === code)
        if (!findedProduct) throw new Error('Product not found')

        return findedProduct
    }

    async add(product: Product) {
        const newProduct = new Product(product)
        await this.db.insert<Product>('products', newProduct.props)
        return newProduct
    }

    async remove(id: string) {
        await this.db.delete('products', id)
    }
}
