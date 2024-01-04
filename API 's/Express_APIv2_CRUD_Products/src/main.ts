import { Express } from "express"
import { AppController } from "./app/controllers/AppController"
import { ProductRepository } from "./app/repositories/ProductRepository"
import { DB } from "./infra/database/connection"
import { ProductRepositoryDatabase } from "./infra/repositories/implementations/ProductRepositoryDatabase"
import { App } from "./server"

export type Config = {
    app: Express
    services: {
        productRepository: ProductRepository
    }
}

(() => {
    const { app } = new App()
    const { client } = new DB()
    const config: Config = {
        app,
        services: {
            productRepository: new ProductRepositoryDatabase(client)
        }
    }
    const controller = new AppController()
    controller.start(config)
})()