import { resolve } from 'path'
import { writeFile, readFile, access } from 'fs/promises'
import { constants } from 'fs'
import { Client } from '../../domain/entities/Client'
import { Product } from '../../domain/entities/Product'
import { SalesOrder } from '../../domain/entities/SalesOrder'

type DBTypes = 'clients' | 'products' | 'orders'

export class DB {
    static instance: DB

    private clients: Map<string, Omit<Client, 'id'>> = new Map()
    private products: Map<string, Omit<Product, 'id'>> = new Map()
    private orders: Map<string, Omit<SalesOrder, 'id'>> = new Map()

    #path = resolve(__dirname, '.db.json')

    constructor() {
        if (!DB.instance) DB.instance = this
        return DB.instance
    }

    async save() {
        return writeFile(
            this.#path,
            JSON.stringify({
                clients: [...this.clients.entries()],
                products: [...this.products.entries()],
                orders: [...this.orders.entries()],
            }, null, 2)
        )
    }

    async #load() {
        const rawData = await readFile(this.#path, 'utf-8')

        this.clients = new Map(Array.isArray(JSON.parse(rawData).clients) ? JSON.parse(rawData).clients : new Map())
        this.products = new Map(Array.isArray(JSON.parse(rawData).products) ? JSON.parse(rawData).products : new Map())
        this.orders = new Map(Array.isArray(JSON.parse(rawData).orders) ? JSON.parse(rawData).orders : new Map())
    }

    async init() {
        try {
            await access(this.#path, constants.F_OK)
            await this.#load()
        } catch (err) {
            await this.save()
        }
    }

    async insert<T>(database: DBTypes, data: T) {
        await this.init()

        this[database].set(data.id, data)
        await this.save()
    }

    async update<T>(db: DBTypes, id: string, updatedData: T) {
        await this.init()

        const data = await this[db].get(id)
        const updData = Object.assign(data, updatedData)

        await this.insert<T>(db, updData)

        return updData
    }

    async delete(db: DBTypes, id: string) {
        await this.init()

        this[db].delete(id)
        await this.save()
    }

    async get(db: DBTypes, id: string) {
        await this.init()

        return this[db].get(id)
    }

    async list(db: DBTypes) {
        await this.init()

        return [...this[db].values()]
    }
}
