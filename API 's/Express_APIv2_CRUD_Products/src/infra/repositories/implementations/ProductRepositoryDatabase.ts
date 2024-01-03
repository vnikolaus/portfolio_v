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

    // async update(id: string, data: Partial<Product>) {
    //     // METODO 1
    //     const existentProduct = await this.findById(id)
    //     const params = {
    //         TableName: "Thread",
    //         Key: {
    //             code: { S: existentProduct.code }
    //         },
    //         UpdateExpression: "set description = :val1, storage = :val2, price = :val3, supplier = :val4, barcode = :val5",
    //         ConditionExpression: "id = :val6",
    //         ExpressionAttributeValues: {
    //             ':val1': {S: data.description ?? existentProduct.description },
    //             ':val2': {S: data.storage ?? existentProduct.storage },
    //             ':val3': {S: data.price ?? existentProduct.price },
    //             ':val4': {S: data.supplier ?? existentProduct.supplier },
    //             ':val5': {S: data.barcode ?? existentProduct.barcode },
    //             ':val6': {S: id}
    //         },
    //         ReturnValues: "ALL_NEW"
    //     }
    //     await this.db.updateItem(params, this.#timeout)

    //     // METODO 2
    //     const updatedCommand = new UpdateItemCommand({
    //         TableName: this.#table,
    //         Key: { 
    //             code: { S: existentProduct.code }
    //         },
    //         UpdateExpression: 'set description = :description, storage = :storage, price = :price, supplier = :supplier, barcode = :barcode',
    //         ExpressionAttributeValues: { 
    //             ':description': { S: data.description ?? existentProduct.description },
    //             ':storage': { S: data.storage ?? existentProduct.storage },
    //             ':price': { S: data.price ?? existentProduct.price },
    //             ':supplier': { S: data.supplier ?? existentProduct.supplier },
    //             ':barcode': { S: data.barcode ?? existentProduct.barcode },
    //         },
    //         ReturnValues: 'ALL_NEW'
    //     })
    //     await this.db.send(updatedCommand)
    // }
}