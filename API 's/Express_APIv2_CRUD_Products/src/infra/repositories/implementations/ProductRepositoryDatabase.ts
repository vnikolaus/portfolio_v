import { DynamoDB, UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import { ProductRepository } from "../../../app/repositories/ProductRepository";
import { Product } from "../../../domain/entities/Product";

export class ProductRepositoryDatabase implements ProductRepository {
    readonly #table = process.env.AWS_TABLE
    readonly #timeout = { requestTimeout: 5 }

    constructor(private readonly db: DynamoDB) {}

    #formatData(data: any): Product {
        let obj = {}
        Object.keys(data).forEach(key => obj[key] = data[key].S)
        return new Product(obj)
    }

    async find(): Promise<Product[]> {
        const params = { TableName: this.#table }
        const { Items } = await this.db.scan(params, this.#timeout)
        let list = []
        for (let i in Items) {
            list[i] = this.#formatData(Items[i])
        }
        return list
    }

    async findById(id: string): Promise<Product> {
        const products = await this.find()
        return products.find(el => el.id === id)
    }

    async findByCode(code: string): Promise<Product> {
        const params = {
            TableName: this.#table,
            Key: { 
                code: { S: code }
            },
        }
        const { Item } = await this.db.getItem(params, this.#timeout)
        if (!Item) return
        const product = this.#formatData(Item)
        return product
    }

    async insert(product: Product): void {
        const productParams = {
            id: { S: product.id },
            code: { S: product.code },
            description: { S: product.description },
            storage: { S: product.storage },
            price: { S: product.price },
            supplier: { S: product.supplier },
            barcode: { S: product.barcode },
            createdAt: { S: product.createdAt },
            updatedAt: { S: product.updatedAt }
        }
        const params = { TableName: this.#table, Item: productParams }
        await this.db.putItem(params, this.#timeout)
    }

    async remove(id: string): void {
        const removedProduct = await this.findById(id)
        if (!removedProduct) throw new Error('ID already removed.')
        const params = {
            TableName: this.#table,
            Key: { 
                code: { S: removedProduct.code }
            },
        }
        await this.db.deleteItem(params)
    }
}